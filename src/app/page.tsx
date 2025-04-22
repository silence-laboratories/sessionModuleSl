"use client";

import { useState } from "react";
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
} from "../../lib/sl";
import { privateKeyToAccount } from "viem/accounts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Add these styles at the top of the file
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const carouselItems = [
  {
    title: "Secure MPC Transactions",
    description: "Experience secure multi-party computation for your blockchain transactions",
    icon: "🔒",
  },
  {
    title: "Smart Session Management",
    description: "Create and manage smart sessions with ease",
    icon: "⚡",
  },
  {
    title: "Real-time Chat Interface",
    description: "Communicate with your backend in real-time",
    icon: "💬",
  },
];

export default function SessionPage() {
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
  // Flag to show that the session file has been downloaded and chat UI unlocked.
  const [sessionDownloaded, setSessionDownloaded] = useState<boolean>(false);

  // Chat UI states
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLog, setChatLog] = useState<
    Array<{ sender: string; message: string }>
  >([]);

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
  // This sends the chat message (e.g. "send 0.00001 to 0xABC...") to your backend.
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    // Append user's message to the chat log.
    setChatLog((prev) => [...prev, { sender: "user", message: chatInput }]);

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
      // Append the backend's response to the chat log.
      setChatLog((prev) => [
        ...prev,
        { sender: "backend", message: JSON.stringify(data) },
      ]);
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setChatLog((prev) => [
        ...prev,
        {
          sender: "backend",
          message: err.message || "An error occurred while sending message",
        },
      ]);
    }
    // Clear the chat input after sending.
    setChatInput("");
  };

  return (
    <div className="min-h-screen p-8 font-mono bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          MPC-Powered Smart Session: Transaction Orchestration
        </h1>

        <div className="space-y-8">
          {/* --- MPC and Session Creation Section --- */}
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <button
              onClick={initializeMPCSigner}
              disabled={!!mpcSigner}
              className={`px-6 py-3 rounded-lg w-full mb-4 transition-all duration-300 ${
                mpcSigner
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1"
              }`}
            >
              {mpcSigner ? "✅ MPC Signer Ready" : "Initialize MPC Signer"}
            </button>

            {mpcSigner && (
              <button
                onClick={createSmartSession}
                disabled={!!sessionDetails}
                className={`px-6 py-3 rounded-lg w-full mb-4 transition-all duration-300 ${
                  sessionDetails
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transform hover:-translate-y-1"
                }`}
              >
                {sessionDetails ? "✅ Session Created" : "Create Smart Session"}
              </button>
            )}

            {sessionDetails && (
              <>
                <button
                  onClick={downloadSessionFile}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg w-full mb-4 transition-all duration-300 hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1"
                >
                  Download Session Info
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  This file contains the session info, MPC signer data, key generation details, and full key configuration required for backend processing.
                </p>
              </>
            )}
          </div>

          {/* --- Chat Window Section --- */}
          {sessionDownloaded && (
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">💬 Chat with Backend</h2>
              {/* Chat log area */}
              <div className="border border-gray-200 dark:border-gray-700 p-4 h-96 overflow-y-auto mb-6 rounded-lg bg-gray-50 dark:bg-gray-900">
                {chatLog.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No messages yet. Start a conversation!</p>
                ) : (
                  chatLog.map((entry, index) => (
                    <div
                      key={index}
                      className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                        entry.sender === "user"
                          ? "bg-blue-500 text-white ml-auto"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                      }`}
                    >
                      <span className="font-semibold">
                        {entry.sender === "user" ? "You:" : "Backend:"}
                      </span>{" "}
                      <span>{entry.message}</span>
                    </div>
                  ))
                )}
              </div>
              {/* Chat input area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder='Type a message, e.g. "send 0.00001 to 0xABC..."'
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                />
                <button
                  onClick={sendChatMessage}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* --- Loading Status --- */}
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-blue-500 font-medium mt-2">{loading}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
