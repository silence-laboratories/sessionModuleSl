import { useState, useRef, useEffect } from "react";
import {
  createSmartAccountClient,
  toNexusAccount,
  smartSessionActions,
  toSmartSessionsModule,
  getSudoPolicy,
} from "@biconomy/abstractjs";
import { Address, http, createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import {
  createViemAccount,
  generateCryptographicKey,
  createSignerForSign,
} from "@/lib/sl";
import { SessionHeader } from "@/components/SessionHeader";
import { SessionSetup } from "@/components/SessionSetup";
import { ChatInterface } from "@/components/ChatInterface";
import { Loader2, X } from "lucide-react";

const chain = { ...baseSepolia, id: 84532 };
const ALCHEMY_RPC = import.meta.env.VITE_ALCHEMY_RPC;
const BICONOMY_BUNDLER_URL = import.meta.env.VITE_BICONOMY_BUNDLER_URL;
const ERC20_TOKEN_ADDRESS: Address = import.meta.env
  .VITE_ERC20_TOKEN_ADDRESS as Address;

const SESSION_STORE_URL =
  "https://sessionstoreservice.demo.silencelaboratories.com/api/session";


let AGENT_ID: string | null = null;
let ELIZA_MESSAGE_URL: string | null = null;

(async () => {
  try {
    const response = await fetch("https://elizasi.demo.silencelaboratories.com/agents");
    const data = await response.json();
    AGENT_ID = data.agents[0]?.id || null;
    
    if (AGENT_ID) {
      console.log("Agent ID:", AGENT_ID);
      ELIZA_MESSAGE_URL = `https://elizasi.demo.silencelaboratories.com/${AGENT_ID}/message`;
      console.log("ELIZA_MESSAGE_URL", ELIZA_MESSAGE_URL);
    } else {
      console.log("No agents found");
    }
  } catch (error) {
    console.error("Error fetching agent ID:", error);
  }
})();

const uuidForKey = (keyId: string) => {
  const key = `session_user_id_${keyId}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

export default function Index() {
  /* ── core state ───────────────────────────────────── */
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [keygenData, setKeygenData] = useState<any>(null);
  const [keyConfig, setKeyConfig] = useState<any>(null);
  const [userId, setUserId] = useState("");

  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [nexusAccountAddress, setNexusAccountAddress] = useState<Address>();
  const [ownerAccount, setOwnerAccount] = useState<any>(null);

  const [loading, setLoading] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const [showFundPopup, setShowFundPopup] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] =
    useState<Address | null>(null);

  const sessionPhaseRef = useRef<any>(null); // to resume after funding

  const [sessionUploaded, setSessionUploaded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>(
    []
  );
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const initializeMPCSigner = async () => {
    setLoading("Initializing MPC Signer…");
    try {
      const { keyConfig: cfg } = await generateCryptographicKey();
      setKeyConfig(cfg);

      const { networkSigner, keyId, publicKey } = await createSignerForSign();
      const mpc = createViemAccount(networkSigner, keyId, publicKey);

      setKeygenData({ keyId, publicKey });
      setMpcSigner(mpc);

      setUserId(uuidForKey(keyId));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  };

  const createSmartSession = async () => {
    if (showFundPopup) return;
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

      sessionPhaseRef.current = { owner, nexusAccount };
      setShowFundPopup(true);
      setTimeout(() => setShowFundPopup(false), 60_000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  };

  const resumeSmartSession = async () => {
    if (!sessionPhaseRef.current) return;
    setLoading("Finalising Smart Session…");
    try {
      const { owner, nexusAccount } = sessionPhaseRef.current;
      const nexusClient = createSmartAccountClient({
        account: nexusAccount,
        transport: http(BICONOMY_BUNDLER_URL),
      });

      const smartModule = toSmartSessionsModule({ signer: owner });
      const installHash = await nexusClient.installModule({
        module: smartModule,
      });
      const rec = await nexusClient.waitForUserOperationReceipt({
        hash: installHash,
      });
      if (!rec.success) throw new Error("Module installation failed");

      const sessionClient = nexusClient.extend(smartSessionActions());
      const session = await sessionClient.grantPermission({
        redeemer: mpcSigner.address,
        actions: [
          {
            actionTarget: ERC20_TOKEN_ADDRESS,
            actionTargetSelector: "0xa9059cbb",
            actionPolicies: [getSudoPolicy()],
          },
        ],
      });
      setSessionDetails(session);

      await uploadSessionInfo(session); // ← auto-sync
      setToast("✓ Session data synced with backend");
    } catch (e) {
      console.error(e);
      setToast("⚠️ Upload failed — retry will occur automatically");
    } finally {
      sessionPhaseRef.current = null;
      setLoading("");
    }
  };

  useEffect(() => {
    if (!showFundPopup && sessionPhaseRef.current) resumeSmartSession();
  }, [showFundPopup]);

  const uploadSessionInfo = async (freshSession: any) => {
    if (!freshSession || !keygenData || !keyConfig || !mpcSigner) return;

    const payload = {
      sessionInfo: {
        sessionDetails: freshSession,
        mpcSigner: {
          address: mpcSigner.address,
          source: "custom",
          type: "local",
        },
        keygenData,
        keyConfig,
        nexusAccountAddress,
        ownerAccount: {
          address: ownerAccount!.account.address,
          source: "metamask",
          type: "walletClient",
        },
      },
    };

    const res = await fetch(SESSION_STORE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify(payload, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    });
    if (!res.ok) throw new Error(await res.text());
    setSessionUploaded(true);
  };

  const formatMessage = (d: any): string => {
    if (typeof d === "string") return d;

    if (Array.isArray(d)) {
      return d
        .map((item) => {
          if (item.text) return item.text;
          if (item.content?.transaction_hash)
            return `🚀 Transaction sent!\n🔗 Hash: ${item.content.transaction_hash}`;
          return null;
        })
        .filter(Boolean)
        .join("\n");
    }

    if (d?.text) return d.text;
    if (d?.content?.transaction_hash)
      return `🚀 Transaction sent!\n🔗 Hash: ${d.content.transaction_hash}`;

    return typeof d === "object" ? JSON.stringify(d, null, 2) : String(d);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const wrappedText = `[sid:${userId}] ${chatInput}`;
    setChatLog((p) => [...p, { sender: "user", message: chatInput }]);
    setIsSendingMessage(true);

    try {
      if (!sessionUploaded) {
        try {
          await uploadSessionInfo(sessionDetails);
        } catch (_e) {
          setToast("⚠️ Upload failed — retry will occur automatically");
        }
      }

      const fd = new FormData();
      fd.append("text", wrappedText);
      fd.append("user", "user");

      const res = await fetch(ELIZA_MESSAGE_URL, { method: "POST", body: fd });
      const raw = await res.text();
      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }

      setChatLog((prev) => [
        ...prev,
        { sender: "backend", message: formatMessage(data) },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setChatInput("");
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <SessionHeader />

        <SessionSetup
          mpcSigner={mpcSigner}
          sessionDetails={sessionDetails}
          loading={loading}
          initializeMPCSigner={initializeMPCSigner}
          createSmartSession={createSmartSession}
        />

        {loading && (
          <div className="flex items-center justify-center py-4 gap-2 text-blockchain-purple">
            <Loader2 className="h-5 w-5 animate-spin" /> {loading}
          </div>
        )}

        {toast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-2 rounded shadow flex items-center gap-2">
            <span>{toast}</span>
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => setToast(null)}
            />
          </div>
        )}

        {showFundPopup && smartAccountAddress && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-md text-center space-y-4">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                onClick={() => setShowFundPopup(false)}
              >
                <X className="h-4 w-4" />
              </button>

              <h2 className="text-xl font-bold">⚠️ Fund Required</h2>
              <p>
                Send at least <strong>0.002 ETH</strong> to:
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

        {sessionUploaded && (
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
