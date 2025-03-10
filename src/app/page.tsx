// app/page.tsx
"use client";
import { useState } from 'react';
import { createSmartAccountClient, toNexusAccount, smartSessionCreateActions, toSmartSessionsValidator, smartSessionUseActions, stringify, parse, SmartSessionMode, CreateSessionDataParams } from "@biconomy/abstractjs";
import { baseSepolia } from "viem/chains";
import { http, encodeFunctionData, Hash } from "viem";
import { createSilenceLabsSigner, createViemAccount } from '../../lib/sl';
import abi from './../../contracts/ABI.json'; // Import your Counter ABI
import { privateKeyToAccount } from 'viem/accounts';

export default function SessionPage() {
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [loading, setLoading] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  // Initialize MPC Signer
  const initializeMPCSigner = async () => {
    setLoading('Initializing MPC signer...');
    try {
      const { networkSigner, keygenResponse } = await createSilenceLabsSigner();
      const mpcAccount = createViemAccount(
        networkSigner,
        keygenResponse.keyId,
        keygenResponse.publicKey
      );
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
      const ownerPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393"; // Replace with actual owner key
      const ownerAccount = privateKeyToAccount(ownerPrivateKey);
      
      const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
      
      const nexusClient = await createSmartAccountClient({
        account: await toNexusAccount({
          signer: ownerAccount,
          chain: baseSepolia,
          transport: http(),
        }),
        transport: http(bundlerUrl),
      });

      // Create and install sessions module
      const sessionsModule = toSmartSessionsValidator({
        account: nexusClient.account,
        signer: ownerAccount
      });

      const hash = await nexusClient.installModule({
        module: sessionsModule.moduleInitData
      });
      console.log("Module Installation Hash:", hash);
      
      await nexusClient.waitForUserOperationReceipt({ hash });

      const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));

      // Create session with MPC public key
      const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
          sessionKeyData: mpcSigner.address as `0x${string}`, // Use sessionKeyData instead of sessionPublicKey
          actionPoliciesInfo: [{
            contractAddress: "0xYOUR_CONTRACT_ADDRESS" as `0x${string}`,
            rules: [],
            functionSelector: "0x273ea3e3" as `0x${string}` // Function selector for 'incrementNumber'
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

      // Store session data
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
      const bundlerUrl = "YOUR_BICONOMY_BUNDLER_URL";
      
      // Create MPC-powered client
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
      const usePermissionsModule = toSmartSessionsValidator({
        account: smartSessionClient.account,
        signer: mpcSigner,
        moduleData: parsedData.moduleData
      });

      const sessionEnabledClient = smartSessionClient.extend(
        smartSessionUseActions(usePermissionsModule)
      );

      // Execute transaction
      const userOpHash = await sessionEnabledClient.usePermission({
        calls: [{
          to: "0xYOUR_CONTRACT_ADDRESS",
          data: encodeFunctionData({
            abi: abi,
            functionName: "incrementNumber"
          })
        }]
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