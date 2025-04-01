"use client";
import { useState } from 'react';
import {
  createSmartAccountClient,
  toNexusAccount,
  smartSessionCreateActions,
  toSmartSessionsValidator,
  stringify,
  parse,
  SmartSessionMode,
  CreateSessionDataParams,
} from "@biconomy/abstractjs";
import { baseSepolia } from "viem/chains";
import { http } from "viem";
import { createViemAccount, generateCryptographicKey, createSignerForSign } from '../../lib/sl';
import { privateKeyToAccount } from 'viem/accounts';

const CounterAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCounter",
        "type": "uint256"
      }
    ],
    "name": "Incremented",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "counter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default function SessionPage() {
  const [mpcSigner, setMpcSigner] = useState<any>(null);
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [loading, setLoading] = useState<string>('');

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

  // Create Biconomy Smart Session
  const createSmartSession = async () => {
    if (!mpcSigner) return;
    setLoading('Creating smart session...');

    try {
      const ownerPrivateKey = "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03"; // Replace with actual key
      const ownerAccount = privateKeyToAccount(ownerPrivateKey);
      const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
      console.log("Owner Account:", ownerAccount.address);

      const nexusClient = await createSmartAccountClient({
        account: await toNexusAccount({
          signer: ownerAccount,
          chain: baseSepolia,
          transport: http(),
        }),
        transport: http(bundlerUrl),
      });

      console.log("Nexus Client:", nexusClient.account.address);

      const sessionsModule = toSmartSessionsValidator({
        account: nexusClient.account,
        signer: ownerAccount
      });
      console.log("Sessions Module:", sessionsModule.moduleInitData);

      const hash = await nexusClient.installModule({
        module: sessionsModule.moduleInitData
      });
      console.log("Module Installation Hash:", hash);

      const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash });
      if (!installSuccess) {
        console.error("❌ Failed to install Smart Sessions module");
        setLoading('');
        return;
      }
      console.log("✅ Smart Sessions module installed successfully");

      const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));

      const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
          sessionPublicKey: mpcSigner.address as `0x${string}`,
          actionPoliciesInfo: [
            {
              contractAddress: "0x7961d826258946969fa0d80b34508094c6148bdf" as `0x${string}`,
              abi: CounterAbi,
              sudo: true 
            }
          ]
        }
      ];

      console.log("sessionRequestedInfo:", sessionRequestedInfo);

      const createSessionsResponse = await nexusSessionClient.grantPermission({
        sessionRequestedInfo
      });
      const { success } = await nexusClient.waitForUserOperationReceipt({
        hash: createSessionsResponse.userOpHash
      });

      if (!success) {
        console.error("❌ Failed to create Smart Session");
        setLoading('');
        return;
      }
      console.log("✅ Smart Session created successfully");

      const sessionData = {
        granter: nexusClient.account.address,
        sessionPublicKey: mpcSigner.address,
        moduleData: {
          permissionIds: createSessionsResponse.permissionIds,
          mode: SmartSessionMode.USE,
          sessions: createSessionsResponse.sessions
        }
      };

      const compressedData = stringify(sessionData);
      localStorage.setItem('mpcSessionData', compressedData);
      setSessionData(compressedData);
      setLoading('');
    } catch (error) {
      console.error('Session Creation Error:', error);
      setLoading('');
    }
  };

  // Download the session data as a JSON file
  const downloadSessionData = () => {
    if (!sessionData) return;
    const blob = new Blob([sessionData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sessionData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-animation text-white font-sans flex items-center justify-center p-4">
      {/* Animated floating elements - just for a nice background effect */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl animate-float1 top-[-10rem] left-[-10rem]" />
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full opacity-30 blur-3xl animate-float2 bottom-[-10rem] right-[-10rem]" />

      <div className="relative z-10 max-w-2xl w-full bg-black bg-opacity-40 backdrop-blur-xl p-8 rounded-xl shadow-2xl animate-fadeIn">
        <h1 className="text-4xl font-extrabold mb-6 text-center animate-popIn">
          MPC-Powered Smart Sessions
        </h1>

        <div className="space-y-6">
          {/* 1) Initialize MPC Signer */}
          <button
            onClick={initializeMPCSigner}
            disabled={!!mpcSigner}
            className={`w-full py-3 px-4 rounded-md text-lg font-semibold transition-all duration-500 
              ${
                mpcSigner
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-300 hover:scale-105`}
          >
            {mpcSigner ? 'MPC Signer Ready' : 'Initialize MPC Signer'}
          </button>

          {/* 2) Create Smart Session */}
          {mpcSigner && (
            <button
              onClick={createSmartSession}
              disabled={!!sessionData}
              className={`w-full py-3 px-4 rounded-md text-lg font-semibold transition-all duration-500
                ${
                  sessionData
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500 hover:shadow-purple-500/50 hover:shadow-lg'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-300 hover:scale-105`}
            >
              {sessionData ? 'Session Created' : 'Create Smart Session'}
            </button>
          )}

          {/* 3) Download Session Data */}
          {sessionData && (
            <button
              onClick={downloadSessionData}
              className="w-full py-3 px-4 bg-green-600 rounded-md text-lg font-semibold hover:bg-green-500 hover:shadow-green-500/50 hover:shadow-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-green-300 hover:scale-105"
            >
              Download Session Data
            </button>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center mt-6">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 animate-spin"></div>
              <p className="ml-3 text-lg self-center">{loading}</p>
            </div>
          )}

          {/* Addresses */}
          <div className="mt-8 space-y-2 text-center">
            {mpcSigner && (
              <p className="break-words">
                <span className="font-semibold">MPC Signer Address:</span> {mpcSigner.address}
              </p>
            )}
            {sessionData && (
              <p className="break-words">
                <span className="font-semibold">Session Granter:</span> {parse(sessionData).granter}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
