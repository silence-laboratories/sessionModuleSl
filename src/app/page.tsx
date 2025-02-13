// pages/index.tsx
"use client"
import { useState } from "react";
import { createOwnerNexusClient, installSmartSessionModule } from "../../lib/biconomy";
import { encodeFunctionData } from "viem";
import IncrementerABI from "../../contracts/ABI.json";
import styles from "./page.module.css";

export default function Home() {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [sessionCreated, setSessionCreated] = useState(false);

  // Send a transaction using the integrated Biconomy + Silence Labs session
  const sendTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Create owner client
      setStep(1);
      const nexusClient = await createOwnerNexusClient();

      // Step 2: Install smart sessions module with MPC signer
      setStep(2);
      const { nexusSessionClient, sessionSigner } = 
        await installSmartSessionModule(nexusClient);

      // Step 3: Set up session permissions
      setStep(3);
      const sessionRequestedInfo = [
        {
          sessionPublicKey: sessionSigner.address,
          actionPoliciesInfo: [
            {
              contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
              rules: [],
              functionSelector: encodeFunctionData({
                abi: IncrementerABI,
                functionName: "increment"
              }).slice(0, 10), // Get function selector
            },
          ],
        },
      ];

      // Step 4: Grant session permission
      setStep(4);
      const createSessionsResponse = await nexusSessionClient.grantPermission({
        sessionRequestedInfo,
      });
      await nexusClient.waitForUserOperationReceipt({ hash: createSessionsResponse.userOpHash });
      setSessionCreated(true);

      // Step 5: Send increment transaction
      setStep(5);
      const userOpHash = await nexusSessionClient.usePermission({
        calls: [
          {
            to: "0xd9145CCE52D386f254917e481eB44e9943F39138",
            data: encodeFunctionData({
              abi: IncrementerABI,
              functionName: "increment"
            })
          }
        ]
      });

      setTxHash(userOpHash);
      setStep(6);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepNumber: number) => {
    if (loading && step === stepNumber) return "⏳";
    if (step > stepNumber) return "✅";
    return "⭕";
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Smart Sessions Demo with MPC</h1>
        
        <div className={styles.steps}>
          <ol>
            <li>
              {getStepStatus(1)} Creating owner Nexus client
            </li>
            <li>
              {getStepStatus(2)} Installing smart sessions module with MPC signer
            </li>
            <li>
              {getStepStatus(3)} Setting up session permissions
            </li>
            <li>
              {getStepStatus(4)} Granting session permission
            </li>
            <li>
              {getStepStatus(5)} Sending increment transaction
            </li>
            {step === 6 && (
              <li>
                ✅ Transaction complete!
              </li>
            )}
          </ol>
        </div>

        <div className={styles.actions}>
          <button 
            onClick={sendTransaction} 
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Processing..." : "Send Transaction"}
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            Error: {error}
          </div>
        )}

        {txHash && (
          <div className={styles.success}>
            <p>Transaction successful! 🎉</p>
            <p className={styles.hash}>
              Hash: <code>{txHash}</code>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
