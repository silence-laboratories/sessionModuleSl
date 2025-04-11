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

// --- Constants --- //
const chain = { ...baseSepolia, id: 84532 };

const ALCHEMY_RPC = "https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD";
const BICONOMY_BUNDLER_URL = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const OWNER_PRIVATE_KEY = "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03";

// ERC20 test token on Base Sepolia
const ERC20_TOKEN_ADDRESS: Address = "0x03AA93e006fBa956cdBAfa2b8EF789D0Cb63e7b4"; // Example token (mock)

export default function SessionPage() {
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [nexusAccountAddress, setNexusAccountAddress] = useState<Address>();
  const [ownerAccount, setOwnerAccount] = useState<any>();
  const [loading, setLoading] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  // User input state
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const initializeMPCSigner = async () => {
    setLoading("Initializing MPC signer...");
    try {
      await generateCryptographicKey();
      const { networkSigner, keyId, publicKey } = await createSignerForSign();
      const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
      setMpcSigner(mpcAccount);
      setLoading("");
    } catch (err) {
      console.error("MPC Signer Error:", err);
      setLoading("");
    }
  };

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

      const receipt = await nexusClient.waitForUserOperationReceipt({ hash: installHash });
      if (!receipt.success) throw new Error("Module installation failed");

      const sessionClient = nexusClient.extend(smartSessionActions());

      const session = await sessionClient.grantPermission({
        redeemer: mpcSigner.address,
        actions: [{
          actionTarget: ERC20_TOKEN_ADDRESS,
          actionTargetSelector: "0xa9059cbb", // transfer(address,uint256)
          actionPolicies: [getSudoPolicy()],
        }],
      });

      setSessionDetails(session);
      setLoading("");
    } catch (err) {
      console.error("Session Creation Error:", err);
      setLoading("");
    }
  };

  const executeERC20WithSession = async () => {
    if (!sessionDetails) return;
    setLoading("Executing ERC20 Transfer via Session...");
    try {
      const emulatedAccount = await toNexusAccount({
        accountAddress: nexusAccountAddress,
        signer: mpcSigner,
        chain,
        transport: http(ALCHEMY_RPC),
      });

      const nexusClient = createSmartAccountClient({
        account: emulatedAccount,
        transport: http(BICONOMY_BUNDLER_URL),
      });

      const data = encodeFunctionData({
        abi: parseAbi([
          "function transfer(address to, uint256 amount) returns (bool)",
        ]),
        functionName: "transfer",
        args: [recipient as Address, parseEther(amount)],
      });

      const smartSessionsClient = nexusClient.extend(smartSessionActions());

      const userOpHash = await smartSessionsClient.usePermission({
        sessionDetails,
        calls: [{
          to: ERC20_TOKEN_ADDRESS,
          data,
        }],
        mode: "ENABLE_AND_USE",
      });

      const receipt = await nexusClient.waitForUserOperationReceipt({ hash: userOpHash });
      if (!receipt.success) throw new Error("Transfer failed");

      console.log("ERC20 Transfer Success:", receipt);
      setTxHash(userOpHash);
      setLoading("");
    } catch (err) {
      console.error("Execution Error:", err);
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold mb-6">MPC-Powered Smart Session: ERC20 Transfer</h1>

      <div className="space-y-4 max-w-xl">
        <button
          onClick={initializeMPCSigner}
          disabled={!!mpcSigner}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {mpcSigner ? "✅ MPC Signer Ready" : "Initialize MPC Signer"}
        </button>

        {mpcSigner && (
          <button
            onClick={createSmartSession}
            disabled={!!sessionDetails}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            {sessionDetails ? "✅ Session Created" : "Create Smart Session"}
          </button>
        )}

        {sessionDetails && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={executeERC20WithSession}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Send Token via Session
            </button>
          </div>
        )}

        {loading && <p className="text-blue-500 mt-4">{loading}</p>}
        {txHash && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>Tx Hash:</p>
            <p className="break-all">{txHash}</p>
          </div>
        )}
      </div>
    </div>
  );
}
