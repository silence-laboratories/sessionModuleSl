   import React, { useState, useRef, useEffect } from "react";
   import {
     createSmartAccountClient,
     toNexusAccount,
     smartSessionActions,
     toSmartSessionsModule,
     getSudoPolicy,
   } from "@biconomy/abstractjs";
   import {
     Address,
     http,
     createWalletClient,
     custom,
   } from "viem";
   import { baseSepolia } from "viem/chains";
   import {
     createViemAccount,
     generateCryptographicKey,
     createSignerForSign,
   } from "@/lib/sl";
   import { SessionHeader } from "@/components/SessionHeader";
   import { SessionSetup } from "@/components/SessionSetup";
   import { ChatInterface } from "@/components/ChatInterface";
   import { Loader2 } from "lucide-react";
   
   /* ---------- constants ---------- */
   const chain = { ...baseSepolia, id: 84532 };
   const ALCHEMY_RPC =
     "https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD";
   const BICONOMY_BUNDLER_URL =
     "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
   const ERC20_TOKEN_ADDRESS: Address =
     "0x03AA93e006fBa956cdBAfa2b8EF789D0Cb63e7b4";
   
   const AGENT_ID = "aa0d6f50-b80b-0dfa-811b-1f8750ee6278";
   const ELIZA_MESSAGE_URL = `http://localhost:3000/${AGENT_ID}/message`;
   
   /* ---------- component ---------- */
   export default function Index() {
     /* ---- state ---- */
     const [mpcSigner, setMpcSigner] = useState<any>(null);
     const [keygenData, setKeygenData] = useState<any>(null);
     const [keyConfig, setKeyConfig] = useState<any>(null);
   
     const [sessionDetails, setSessionDetails] = useState<any>(null);
     const [nexusAccountAddress, setNexusAccountAddress] = useState<Address>();
     const [ownerAccount, setOwnerAccount] = useState<any>(null);
   
     const [loading, setLoading] = useState<string>("");
   
     /* fund-me modal */
     const [showFundPopup, setShowFundPopup] = useState(false);
     const [smartAccountAddress, setSmartAccountAddress] =
       useState<Address | null>(null);
   
     /* pause/resume reference */
     const sessionPhaseRef = useRef<any>(null);
   
     /* chat */
     const [sessionDownloaded, setSessionDownloaded] = useState(false);
     const [chatInput, setChatInput] = useState("");
     const [chatLog, setChatLog] = useState<
       { sender: string; message: string }[]
     >([]);
     const [isSendingMessage, setIsSendingMessage] = useState(false);
   
     /* ---------- MPC signer ---------- */
     const initializeMPCSigner = async () => {
       setLoading("Initializing MPC Signer…");
       try {
         const { keyConfig: cfg } = await generateCryptographicKey();
         setKeyConfig(cfg);
   
         const { networkSigner, keyId, publicKey } = await createSignerForSign();
         const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
   
         setKeygenData({ keyId, publicKey });
         setMpcSigner(mpcAccount);
       } catch (e) {
         console.error(e);
       } finally {
         setLoading("");
       }
     };
   
     /* ---------- Smart-session phase-1 ---------- */
     const createSmartSession = async () => {
       if (showFundPopup) return; // safeguard
       setLoading("Creating Smart Session…");
       try {
         const [eoa] = await window.ethereum.request({
           method: "eth_requestAccounts",
         });
   
         const owner = createWalletClient({
           account: eoa as Address,
           chain,
           transport: custom(window.ethereum),
         });
         setOwnerAccount(owner);
   
         const nexusAccount = await toNexusAccount({
           signer: owner,
           chain,
           transport: http(ALCHEMY_RPC),
         });
   
         const addr = await nexusAccount.getAddress();
         setSmartAccountAddress(addr);
         setNexusAccountAddress(addr);
   
         /* pause here */
         sessionPhaseRef.current = { owner, nexusAccount };
         setShowFundPopup(true);
         setLoading("");
   
         /* auto-close in 60 s */
         setTimeout(() => setShowFundPopup(false), 60_000);
       } catch (e) {
         console.error("Session Phase-1 Error:", e);
         setLoading("");
       }
     };
   
     /* ---------- Smart-session phase-2 ---------- */
     const resumeSmartSession = async () => {
       if (!sessionPhaseRef.current) return;
       try {
         setLoading("Finalising Smart Session…");
         const { owner, nexusAccount } = sessionPhaseRef.current;
   
         const nexusClient = createSmartAccountClient({
           account: nexusAccount,
           transport: http(BICONOMY_BUNDLER_URL),
         });
   
         const smartModule = toSmartSessionsModule({ signer: owner });
         const installHash = await nexusClient.installModule({ module: smartModule });
         const receipt = await nexusClient.waitForUserOperationReceipt({ hash: installHash });
         if (!receipt.success) throw new Error("Module installation failed");
   
         const sessionClient = nexusClient.extend(smartSessionActions());
         const session = await sessionClient.grantPermission({
           redeemer: mpcSigner.address,
           actions: [{
             actionTarget: ERC20_TOKEN_ADDRESS,
             actionTargetSelector: "0xa9059cbb",
             actionPolicies: [getSudoPolicy()],
           }],
         });
   
         setSessionDetails(session);
       } catch (e) {
         console.error("Session Phase-2 Error:", e);
       } finally {
         sessionPhaseRef.current = null;
         setLoading("");
       }
     };
   
     /* trigger phase-2 once modal closes */
     useEffect(() => {
       if (!showFundPopup && sessionPhaseRef.current) resumeSmartSession();
     }, [showFundPopup]);
   
     /* ---------- helpers ---------- */
     const formatMessage = (d: any): string =>
       typeof d === "string"
         ? d
         : JSON.stringify(d, null, 2);
   
     const sendChatMessage = async () => {
       if (!chatInput.trim()) return;
       setChatLog((p) => [...p, { sender: "user", message: chatInput }]);
       setIsSendingMessage(true);
       try {
         const fd = new FormData();
         fd.append("text", chatInput);
         fd.append("user", "user");
         const r = await fetch(ELIZA_MESSAGE_URL, { method: "POST", body: fd });
         const data = await r.json();
         setChatLog((p) => [...p, { sender: "backend", message: formatMessage(data) }]);
       } catch (e) {
         console.error(e);
       } finally {
         setChatInput("");
         setIsSendingMessage(false);
       }
     };
   
     const downloadSessionFile = () => {
       if (!sessionDetails || !mpcSigner || !keygenData || !keyConfig) return;
       const blob = new Blob(
         [JSON.stringify({ sessionDetails, mpcSigner, keygenData, keyConfig, nexusAccountAddress, ownerAccount }, null, 2)],
         { type: "application/json" },
       );
       const url = URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.href = url;
       a.download = "session-info.json";
       a.click();
       URL.revokeObjectURL(url);
       setSessionDownloaded(true);
     };
   
     /* ---------- UI ---------- */
     return (
       <div className="min-h-screen px-4 py-12 md:px-8 bg-background">
         <div className="max-w-4xl mx-auto">
           <SessionHeader />
   
           <SessionSetup
             mpcSigner={mpcSigner}
             sessionDetails={sessionDetails}
             sessionDownloaded={sessionDownloaded}
             loading={loading}
             initializeMPCSigner={initializeMPCSigner}
             createSmartSession={createSmartSession}
             downloadSessionFile={downloadSessionFile}
           />
   
           {loading && (
             <div className="flex items-center justify-center py-4 gap-2 text-blockchain-purple">
               <Loader2 className="h-5 w-5 animate-spin" /> {loading}
             </div>
           )}
   
           {showFundPopup && smartAccountAddress && (
             <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
               <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-md text-center space-y-4">
                 <button
                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                   onClick={() => setShowFundPopup(false)}
                 >
                   ✕
                 </button>
   
                 <h2 className="text-xl font-bold">⚠️ Fund Required</h2>
                 <p>
                   Send at least <strong>0.002&nbsp;ETH</strong> to:
                 </p>
                 <code className="block break-words p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                   {smartAccountAddress}
                 </code>
                 <p className="text-sm text-zinc-500">
                   Popup auto-closes in 1&nbsp;minute.
                 </p>
               </div>
             </div>
           )}
   
           {sessionDownloaded && (
             <ChatInterface
               chatLog={chatLog}
               chatInput={chatInput}
               isLoading={isSendingMessage}
               setChatInput={setChatInput}
               sendChatMessage={sendChatMessage}
             />
           )}
         </div>
       </div>
     );
   }
   