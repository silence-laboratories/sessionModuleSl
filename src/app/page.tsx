// app/page.tsx
"use client";
import { useState } from 'react';
import {
  createSmartAccountClient,
  toNexusAccount,
  smartSessionCreateActions,
  toSmartSessionsValidator,
  smartSessionUseActions,
  stringify,
  parse,
  SmartSessionMode,
  CreateSessionDataParams,
} from "@biconomy/abstractjs";
import { baseSepolia } from "viem/chains";
import { http, encodeFunctionData } from "viem";
import { createViemAccount, generateCryptographicKey, createSignerForSign } from '../../lib/sl';
import abi from './../../contracts/ABI.json';
import { privateKeyToAccount } from 'viem/accounts';
import { ethers } from 'ethers';

export default function SessionPage() {
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [loading, setLoading] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  // Initialize MPC Signer: generate keys (if needed) and then create the signer for signing
  const initializeMPCSigner = async () => {
    setLoading('Initializing MPC signer...');
    try {
      // Generate key pair (this will store config in localStorage)
      await generateCryptographicKey();
      // Create a NetworkSigner using EphAuth for signing operations
      const { networkSigner, keyId, publicKey } = await createSignerForSign();
      const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
      setMpcSigner(mpcAccount);
      setLoading('');
    } catch (error) {
      console.error('MPC Signer Error:', error);
      setLoading('');
    }
  };

  // Create Biconomy Smart Session
  const createSmartSession = async () => {
    if (!mpcSigner) return;
    setLoading('Creating smart session...');

    try {
      // Initialize Nexus client with owner account
      const ownerPrivateKey = "0xec2387b319f9c96c5f2a3f9f5152208d09c0265d139235cab9c90511e6836fc7"; // Replace with actual owner key
      const ownerAccount = privateKeyToAccount(ownerPrivateKey);

      const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
      const ownerAccountAddress = ownerAccount.address;
      console.log("Owner Account:", ownerAccountAddress);
      const nexusClient = await createSmartAccountClient({
        account: await toNexusAccount({
          signer: ownerAccount,
          chain: baseSepolia,
          transport: http(),
        }),
        transport: http(bundlerUrl),
      });
      console.log("Nexus Client:", nexusClient.account.address);

      // Create and install sessions module
      const sessionsModule = toSmartSessionsValidator({
        account: nexusClient.account,
        signer: ownerAccount
      });
      console.log("Sessions Module:", sessionsModule.moduleInitData);

      const hash = await nexusClient.installModule({
        module: sessionsModule.moduleInitData
      });
      console.log("Module Installation Hash:", hash);

      await nexusClient.waitForUserOperationReceipt({ hash });

      const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));

      // Create session with MPC public key
      const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
          sessionKeyData: mpcSigner.address as `0x${string}`,
          actionPoliciesInfo: [{
            contractAddress: "0x7961d826258946969fa0d80b34508094c6148bdf" as `0x${string}`,
            rules: [],
            functionSelector: "0xd09de08a" as `0x${string}` // Function selector for 'increment'
          }]
        }
      ];
      console.log("sessionRequestedInfo:", sessionRequestedInfo);

      const createSessionsResponse = await nexusSessionClient.grantPermission({
        sessionRequestedInfo
      });

      await nexusClient.waitForUserOperationReceipt({
        hash: createSessionsResponse.userOpHash
      });

      // Store session data in localStorage for persistence
      const sessionDataObj = {
        granter: nexusClient.account.address,
        sessionPublicKey: mpcSigner.address,
        description: `MPC Session for ${nexusClient.account.address.slice(0, 6)}`,
        moduleData: {
          ...createSessionsResponse,
          mode: SmartSessionMode.USE
        }
      };

      const compressedData = stringify(sessionDataObj);
      localStorage.setItem('mpcSessionData', compressedData);
      setSessionData(compressedData);
      setLoading('');
    } catch (error) {
      console.error('Session Creation Error:', error);
      setLoading('');
    }
  };

  // Execute Transaction with MPC Session
  const executeTransaction = async () => {
    if (!sessionData) return;
    setLoading('Executing transaction...');

    try {
      const parsedData = parse(sessionData);
      const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

      // Create MPC-powered client
      console.log("Creating MPC-powered client...");
      const smartSessionClient = createSmartAccountClient({
        chain: baseSepolia,
        account: await toNexusAccount({
          signer: mpcSigner,
          chain: baseSepolia,
          transport: http(),
        }),
        transport: http(bundlerUrl)
      });

      // Attach sessions module
      console.log("Attaching sessions module...");
      const usePermissionsModule = toSmartSessionsValidator({
        account: smartSessionClient.account,
        signer: mpcSigner,
        moduleData: parsedData.moduleData
      });

      const sessionEnabledClient = smartSessionClient.extend(
        smartSessionUseActions(usePermissionsModule)
      );

      // Execute transaction (example: calling 'increment')
      console.log("Executing transaction...");
      const userOpHash = await sessionEnabledClient.usePermission({
        calls: [{
          to: "0x7961d826258946969fa0d80b34508094c6148bdf",
          data: encodeFunctionData({
            abi: abi,
            functionName: "increment"
          })
        }],
        callGasLimit: BigInt(100000),
        verificationGasLimit: BigInt(500000),
        preVerificationGas: BigInt(300000)

      });

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
            disabled={!!sessionData}
          >
            {sessionData ? 'Session Created' : 'Create Smart Session'}
          </button>
        )}

        {sessionData && (
          <button
            onClick={executeTransaction}
            className="btn-success"
          >
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
          {mpcSigner && (
            <p>MPC Signer Address: {mpcSigner.address}</p>
          )}
          {sessionData && (
            <p>Session Granter: {parse(sessionData).granter}</p>
          )}
        </div>
      </div>
    </div>
  );
}
