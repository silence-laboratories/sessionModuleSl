import React, { useState } from "react";
import {
  createSmartAccountClient,
  toNexusAccount,
  smartSessionActions,
  toSmartSessionsModule,
  getSudoPolicy,
} from "@biconomy/abstractjs";
import {
  encodeFunctionData,
  parseEther,
  Address,
  http,
  parseAbi,
} from "viem";
import { baseSepolia } from "viem/chains";
import {
  createViemAccount,
  generateCryptographicKey,
  createSignerForSign,
} from "@/lib/sl";
import { connectMetaMask } from "@/lib/metamask";

import { privateKeyToAccount } from "viem/accounts";
import { SessionHeader } from "@/components/SessionHeader";
import { SessionSetup } from "@/components/SessionSetup";
import { ChatInterface } from "@/components/ChatInterface";
import { Loader2 } from "lucide-react";

// --- Constants --- //
const chain = { ...baseSepolia, id: 84532 };

const ALCHEMY_RPC =
  "https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD";
const BICONOMY_BUNDLER_URL =
  "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const OWNER_PRIVATE_KEY =
  "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03";

// ERC20 test token on Base Sepolia (not used on frontend processing)
const ERC20_TOKEN_ADDRESS: Address =
  "0x03AA93e006fBa956cdBAfa2b8EF789D0Cb63e7b4";

// --- Agent/Backend Configuration --- //
const AGENT_ID = "aa0d6f50-b80b-0dfa-811b-1f8750ee6278";
const ELIZA_MESSAGE_URL = `http://localhost:3000/${AGENT_ID}/message`;

export default function Index() {
  // Core states
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  // keygenData is from createSignerForSign (includes keyId, publicKey)
  const [keygenData, setKeygenData] = useState<any>(null);
  // keyConfig is the full configuration returned from generateCryptographicKey,
  // which includes ephemeralKeyId, ephemeralPrivateKey, signerAddress, etc.
  const [keyConfig, setKeyConfig] = useState<any>(null);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [nexusAccountAddress, setNexusAccountAddress] = useState<Address>();
  const [ownerAccount, setOwnerAccount] = useState<any>(null);
  const [loading, setLoading] = useState<string>("");
  const [metaMaskAccount, setMetaMaskAccount] = useState<Address>();

  // Flag to show that the session file has been downloaded and chat UI unlocked.
  const [sessionDownloaded, setSessionDownloaded] = useState<boolean>(false);

  // Chat UI states
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLog, setChatLog] = useState<
    Array<{ sender: string; message: string }>
  >([]);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // --- Initialize MPC Signer ---
  const initializeMPCSigner = async () => {
    setLoading("Initializing MPC Signer...");
    try {
      // First, generate the full cryptographic key configuration.
      // This returns both the keyConfig and a NetworkSigner instance (which we won't store directly).
      const { keyConfig: newKeyConfig } = await generateCryptographicKey();
      // Save the key configuration so the backend can reconstruct the MPC signer.
      setKeyConfig(newKeyConfig);

      // Next, retrieve the network signer along with keygen data.
      const { networkSigner, keyId, publicKey } = await createSignerForSign();

      // We use these to create an MPC account that will be used in the session.
      const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
      setKeygenData({ keyId, publicKey });
      setMpcSigner(mpcAccount);
      setLoading("");
    } catch (err) {
      console.error("MPC Signer Error:", err);
      setLoading("");
    }
  };

  // --- Create Smart Session ---
  const createSmartSession = async () => {
    setLoading("Creating Smart Session...");
    try {
      const owner = privateKeyToAccount(OWNER_PRIVATE_KEY);
      setOwnerAccount(owner);

      const nexusAccount = await toNexusAccount({
        signer: owner,
        chain,
        transport: http(ALCHEMY_RPC),
      });

      const address = await nexusAccount.getAddress();
      setNexusAccountAddress(address);

      const nexusClient = createSmartAccountClient({
        account: nexusAccount,
        transport: http(BICONOMY_BUNDLER_URL),
      });

      const smartModule = toSmartSessionsModule({ signer: owner });
      const installHash = await nexusClient.installModule({ module: smartModule });

      const receipt = await nexusClient.waitForUserOperationReceipt({
        hash: installHash,
      });
      if (!receipt.success) throw new Error("Module installation failed");

      const sessionClient = nexusClient.extend(smartSessionActions());

      // Create a session that grants permission to the MPC signer.
      const session = await sessionClient.grantPermission({
        redeemer: mpcSigner.address,
        actions: [
          {
            actionTarget: ERC20_TOKEN_ADDRESS,
            actionTargetSelector: "0xa9059cbb", // transfer(address,uint256)
            actionPolicies: [getSudoPolicy()],
          },
        ],
      });

      setSessionDetails(session);
      setLoading("");
    } catch (err) {
      console.error("Session Creation Error:", err);
      setLoading("");
    }
  };

  // --- Download Session File ---
  // This function creates a JSON file containing:
  // - Session details
  // - MPC signer info
  // - Key generation data (from createSignerForSign)
  // - Full key configuration (from generateCryptographicKey)
  // - Nexus Account Address and owner account as needed.
  const downloadSessionFile = () => {
    if (!sessionDetails || !mpcSigner || !keygenData || !keyConfig) return;
    const sessionData = {
      sessionDetails,
      mpcSigner,
      keygenData, // includes keyId and publicKey
      keyConfig,  // additional info: ephemeralKeyId, ephemeralPrivateKey, signerAddress, etc.
      nexusAccountAddress,
      ownerAccount, // Include if needed by backend
    };

    const jsonString = JSON.stringify(
      sessionData,
      (_, value) => (typeof value === "bigint" ? value.toString() : value),
      2
    );    
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "session-info.json";
    a.click();
    URL.revokeObjectURL(url);

    // Mark that file download is complete so that chat UI can be shown.
    setSessionDownloaded(true);
  };

  // --- Send Chat Message to Backend ---
  const formatMessage = (data: any): string => {
    // For user messages, return as is since they're already in plain text
    if (typeof data === 'string') {
      return data;
    }

    // Handle array of messages
    if (Array.isArray(data)) {
      return data.map(item => {
        // If it's a message object with user and text fields
        if (item.user && item.text) {
          return item.text;
        }
        // If it's just a text field
        if (item.text) {
          return item.text;
        }
        // If it's an action with text
        if (item.action === "executeTransaction" && item.text) {
          return item.text;
        }
        // If it has content with transaction details
        if (item.content?.transaction_hash) {
          return `✅ Transaction successful! Hash: ${item.content.transaction_hash}`;
        }
        return item;
      }).filter(Boolean).join('\n');
    }

    // Handle single message object
    if (data.text) {
      return data.text;
    }

    // Handle transaction response
    if (data.content?.success && data.content?.transaction_hash) {
      return `✅ Transaction successful! Hash: ${data.content.transaction_hash}`;
    }

    // If we can't format it nicely, return as JSON but only if necessary
    if (typeof data === 'object' && data !== null) {
      // Try to extract any meaningful text fields
      const textFields = ['message', 'description', 'error', 'status']
        .map(field => data[field])
        .filter(Boolean);
      
      if (textFields.length > 0) {
        return textFields.join('\n');
      }
    }

    // Fallback to JSON only if we really need to
    return JSON.stringify(data, null, 2);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    // Append user's message to the chat log.
    setChatLog((prev) => [...prev, { sender: "user", message: formatMessage(chatInput) }]);
    setIsSendingMessage(true);

    try {
      // Prepare payload with FormData.
      const formData = new FormData();
      formData.append("text", chatInput);
      formData.append("user", "user");

      const response = await fetch(ELIZA_MESSAGE_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to send message to backend");

      const data = await response.json();
      console.log("Response from backend:", data);
      // Append the backend's response to the chat log with proper formatting
      setChatLog((prev) => [
        ...prev,
        { sender: "backend", message: formatMessage(data) },
      ]);
    } catch (err: unknown) {
      console.error("Failed to send message:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred while sending message";
      setChatLog((prev) => [
        ...prev,
        { sender: "backend", message: errorMessage },
      ]);
    } finally {
      // Clear the chat input after sending and reset loading state.
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
          sessionDownloaded={sessionDownloaded}
          loading={loading}
          initializeMPCSigner={initializeMPCSigner}
          createSmartSession={createSmartSession}
          downloadSessionFile={downloadSessionFile}
        />
        
        {/* Show loading indicator when initializing */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 text-blockchain-purple">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{loading}</span>
            </div>
          </div>
        )}
        
        {/* Only show chat interface after session is downloaded */}
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
