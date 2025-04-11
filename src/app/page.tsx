"use client";
import { useState } from 'react';
import {
  createSmartAccountClient,
  toNexusAccount,
  smartSessionActions,
  toSmartSessionsModule,
  getSudoPolicy,
} from "@biconomy/abstractjs";
import { baseSepolia } from "viem/chains";
import { Address, http } from "viem";
import { privateKeyToAccount } from 'viem/accounts';
import { createViemAccount, generateCryptographicKey, createSignerForSign } from '../../lib/sl';

// Ensure that the network chain matches the bundler's expectations.
// The bundler URL below uses chain id 84532—override the baseSepolia chain id accordingly.
const chain = { ...baseSepolia, id: 84532 };

const BICONOMY_BUNDLER_URL =
  "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const CONTRACT_ADDRESS = "0x7961d826258946969fa0d80b34508094c6148bdf";
const OWNER_PRIVATE_KEY =
  "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03";

// Both the grant and redemption flows expect the same selector.
// According to the test code and docs this should be "0x273ea3e3" for the increment() function.
const INCREMENT_SELECTOR = "0x273ea3e3";

export default function SessionPage() {
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [loading, setLoading] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
 const [nexusAccountAddress, setNexusAccountAddress] = useState<Address>();


  // Initialize MPC Signer
  const initializeMPCSigner = async () => {
    setLoading('Initializing MPC signer...');
    try {
      await generateCryptographicKey();
      const { networkSigner, keyId, publicKey } = await createSignerForSign();
      const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
      setMpcSigner(mpcAccount);
      setLoading('');
    } catch (error) {
      console.error('MPC Signer Error:', error);
      setLoading('');
    }
  };

  // Create Smart Session (grant permission)
  const createSmartSession = async () => {
    if (!mpcSigner) return;
    setLoading('Creating smart session...');
    try {
      // Initialize owner account using the provided private key.
      const ownerAccount = privateKeyToAccount(OWNER_PRIVATE_KEY);
      

      // Create a Nexus account for the owner.
      // Note: ensure that the transport RPC URL is correct; here we use the default http() for the RPC.
      const nexusAccount = await toNexusAccount({
        signer: ownerAccount,
        chain, // our overridden chain with id: 84532
        transport: http("https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD"), 
      });

      setNexusAccountAddress(await nexusAccount.getAddress());


      // Create the Nexus client using the bundler URL.
      const nexusClient = createSmartAccountClient({
        account: nexusAccount,
        transport: http(BICONOMY_BUNDLER_URL),
      });

      // Install the Smart Sessions module.
      const smartSessionsModule = toSmartSessionsModule({ signer: ownerAccount });
      const installHash = await nexusClient.installModule({ module: smartSessionsModule });
      const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash: installHash });

      if (!installSuccess) {
        throw new Error("Module installation failed");
      }

      // Extend client with Smart Sessions actions and grant permission,
      // using the hardcoded function selector for the increment() function.
      const smartSessionsClient = nexusClient.extend(smartSessionActions());
      const sessionDetails = await smartSessionsClient.grantPermission({
        redeemer: mpcSigner.address, // MPC signer is the redeemer.
        actions: [{
          actionTarget: CONTRACT_ADDRESS,
          actionTargetSelector: INCREMENT_SELECTOR, // Hardcoded selector.
          actionPolicies: [getSudoPolicy()]
        }]
      });

      console.log('Permission granted:', sessionDetails);
      setSessionDetails(sessionDetails);
      setLoading('');
    } catch (error) {
      console.error('Session Creation Error:', error);
      setLoading('');
    }
  };

  // Execute Transaction (redeem permission)
  const executeTransaction = async () => {
    if (!sessionDetails) return;
    setLoading('Executing transaction...');
    try {
      // Create an emulated (redeemer) account using the Nexus account address from the session,
      // and using the MPC signer as the redeemer key.
      const emulatedAccount = await toNexusAccount({
        accountAddress: nexusAccountAddress, // Use original address
        signer: mpcSigner,
        chain,
        transport: http("https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD"),
      });

      // Create the smart account client with mock mode enabled to simulate gas estimation.
      const emulatedClient = createSmartAccountClient({
        account: emulatedAccount,
        transport: http(BICONOMY_BUNDLER_URL),
      });

      // Extend the client with Smart Sessions actions and redeem the permission.
      // Note that we use the hardcoded selector for the call data.
      const smartSessionsClient = emulatedClient.extend(smartSessionActions());
      const userOpHash = await smartSessionsClient.usePermission({
        sessionDetails,
        calls: [{
          to: CONTRACT_ADDRESS,
          data: INCREMENT_SELECTOR, // Matching the permission's selector.
        }],
        mode: "ENABLE_AND_USE" // For the first usage.
      });

      // Wait for the transaction to process.
      const receipt = await emulatedClient.waitForUserOperationReceipt({ hash: userOpHash });
      if (!receipt.success) {
        throw new Error("Smart sessions module validation failed");
      }
      console.log("Transaction executed successfully, receipt:", receipt);
      setTxHash(userOpHash);
      setLoading('');
    } catch (error) {
      console.error('Execution Error:', error);
      setLoading('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl mb-8">MPC-Powered Smart Sessions</h1>
      <div className="space-y-4 max-w-2xl">
        <button
          onClick={initializeMPCSigner}
          className="btn-primary"
          disabled={!!mpcSigner}
        >
          {mpcSigner ? 'MPC Signer Ready' : 'Initialize MPC Signer'}
        </button>

        {mpcSigner && (
          <button
            onClick={createSmartSession}
            className="btn-secondary"
            disabled={!!sessionDetails}
          >
            {sessionDetails ? 'Session Created' : 'Create Smart Session'}
          </button>
        )}

        {sessionDetails && (
          <button onClick={executeTransaction} className="btn-success">
            Execute Transaction
          </button>
        )}

        {loading && <p className="text-blue-500">{loading}</p>}
        {txHash && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-mono break-words">Transaction Hash: {txHash}</p>
          </div>
        )}

        <div className="mt-8 space-y-2">
          {mpcSigner && <p>MPC Signer Address: {mpcSigner.address}</p>}
          {sessionDetails && <p>Granter Address: {sessionDetails.nexusAccountAddress}</p>}
        </div>
      </div>
    </div>
  );
}
