// "use client";
// import { useState } from "react";
// import {
//   createSmartAccountClient,
//   toNexusAccount,
//   smartSessionCreateActions,
//   toSmartSessionsValidator,
//   smartSessionUseActions,
//   stringify,
//   parse,
//   SmartSessionMode,
//   CreateSessionDataParams,
// } from "@biconomy/abstractjs";
// import { baseSepolia } from "viem/chains";
// import { http, encodeFunctionData, Abi } from "viem";
// import { createViemAccount, generateCryptographicKey, createSignerForSign } from "../../lib/sl";
// import { privateKeyToAccount } from "viem/accounts";

// const CounterAbi = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "newCounter",
//         "type": "uint256"
//       }
//     ],
//     "name": "Incremented",
//     "type": "event"
//   },
//   {
//     "inputs": [],
//     "name": "counter",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "increment",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ] as const satisfies Abi;

// export default function SessionPage() {
//   const [mpcSigner, setMpcSigner] = useState<any>(null);
//   const [sessionData, setSessionData] = useState<string | null>(null);
//   const [keyConfig, setKeyConfig] = useState<any>(null);
//   const [loading, setLoading] = useState<string>('');
//   const [txHash, setTxHash] = useState<string>('');
//   const [elizaAgents, setElizaAgents] = useState<any[]>([]);
//   const [elizaError, setElizaError] = useState<string>("");

//   // === Existing Functions === (no changes here)
//   const initializeMPCSigner = async () => { /* ...same as before... */ };
//   const createSmartSession = async () => { /* ...same as before... */ };
//   const executeTransaction = async () => { /* ...same as before... */ };
//   const downloadSessionFile = () => { /* ...same as before... */ };

//   // === New: Test Eliza Backend ===
//   const fetchElizaAgents = async () => {
//     setElizaError("");
//     setElizaAgents([]);
  
//     try {
//       const res = await fetch("http://localhost:3000/agents", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       });
  
//       if (!res.ok) throw new Error("Failed to fetch agents");
  
//       const data = await res.json();
//       console.log("Eliza Response:", data);
  
//       // ✅ Fix here: the actual array is in data.agents
//       setElizaAgents(data.agents || []);
//     } catch (err: any) {
//       console.error("Eliza fetch failed:", err);
//       setElizaError(err.message || "Unknown error");
//     }
//   };
  

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl mb-8">Session Generator</h1>
//       <div className="space-y-4 max-w-2xl">
//         <button onClick={initializeMPCSigner} className="btn-primary" disabled={!!mpcSigner}>
//           {mpcSigner ? 'MPC Signer Ready' : 'Initialize MPC Signer'}
//         </button>

//         {mpcSigner && (
//           <button onClick={createSmartSession} className="btn-secondary" disabled={!!sessionData}>
//             {sessionData ? 'Session Created' : 'Create Smart Session'}
//           </button>
//         )}

//         {sessionData && (
//           <>
//             <button onClick={executeTransaction} className="btn-success">
//               Execute Transaction
//             </button>
//             <button onClick={downloadSessionFile} className="btn-download">
//               Download Session Info
//             </button>
//             <p className="text-sm text-gray-500">Session ready for Eliza OS execution</p>
//           </>
//         )}

//         {loading && <p className="text-blue-500">{loading}</p>}
//         {txHash && (
//           <div className="mt-4 p-4 bg-gray-100 rounded">
//             <p className="font-mono break-words">Transaction Hash: {txHash}</p>
//           </div>
//         )}

//         <div className="mt-8 space-y-2">
//           {mpcSigner && <p>MPC Signer Address: {mpcSigner.address}</p>}
//         </div>

//         {/* === Eliza Backend Test Section === */}
//        {/* === Eliza Message Sending Section === */}
// <div className="mt-12">
//   <h2 className="text-xl font-bold mb-2">💬 Send Message to Eliza</h2>
//   <button
//     onClick={async () => {
//       try {
//         const agentId = "aa0d6f50-b80b-0dfa-811b-1f8750ee6278"; // Dobby's ID
//         const formData = new FormData();
//         formData.append("text", "execute transaction");
//         formData.append("user", "user");

//         const response = await fetch(`http://localhost:3000/${agentId}/message`, {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();
//         console.log("Response from Eliza:", data);
//         alert("Message sent successfully. Check console.");
//       } catch (err) {
//         console.error("Failed to send message to Eliza:", err);
//         alert("Failed to send message.");
//       }
//     }}
//     className="btn-primary"
//   >
//     Send "execute transaction"
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }
