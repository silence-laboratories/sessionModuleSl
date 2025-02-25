"use client"
import { useState } from "react";
import { encodeFunctionData } from "viem";
import { createOwnerClient, setupMPCSession, createSessionClient, type SessionData } from "../../lib/biconomy";
import IncrementerABI from "../../contracts/ABI.json";
import styles from "./page.module.css";

export default function Home() {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const initializeSession = async () => {
    setLoading(true);
    try {
      // Step 1: Create owner client
      setStep(1);
      const ownerClient = await createOwnerClient();

      // Step 2: Setup MPC Session
      setStep(2);
      const { extendedClient, mpcAccount, networkSigner, primaryKey } = 
        await setupMPCSession(ownerClient);

      // Step 3: Create session data
      console.log("Primary Key:", primaryKey[0].keyId);
      setStep(3);

      
      const sessionInfo: SessionData = {
        granter: ownerClient.account.address,
        sessionPublicKey: mpcAccount.address,
        description: `Permission to increment counter for ${ownerClient.account.address.slice(0, 6)}`,
        moduleData: {
          permissionId: extendedClient.permissionId,
          validUntil: Math.floor(Date.now()/1000) + 3600, // 1 hour session
          mode: 'USE' // Add mode
        },
        mpcAccount,
        networkSigner
      };

      console.log(sessionInfo);
      
      // Step 4: Grant permissions using session module
      setStep(4);
      // const createSessionsResponse = await extendedClient.grantPermission({
      //   sessionRequestedInfo: [{
      //     sessionPublicKey: mpcAccount.address,
      //     actionPoliciesInfo: [{
      //       contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      //       functionSelector: encodeFunctionData({
      //         abi: IncrementerABI,
      //         functionName: "increment"
      //       }).slice(0, 10),
      //       rules: [{
      //         value: 100,
      //         offset: 0,
      //         condition: 0
      //       }]
      //     }]
      //   }]
      // });
      // console.log("Create Sessions Response:", createSessionsResponse);      
      localStorage.setItem('mpcSession', JSON.stringify(sessionInfo));

      setSessionData(sessionInfo);
      setStep(5);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const sendIncrementTx = async () => {
    if (!sessionData) return;
    setLoading(true);
    try {
      // Step 5: Create session client
      setStep(5);
      const sessionClient = await createSessionClient(sessionData);
      
      // Step 6: Execute transaction
      setStep(6);
      const userOpHash = await sessionClient.usePermission({
        calls: [{
          to: "0xd9145CCE52D386f254917e481eB44e9943F39138",
          data: encodeFunctionData({
            abi: IncrementerABI,
            functionName: "increment"
          })
        }]
      });

      setTxHash(userOpHash);
      setStep(7);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepNum: number) => {
    if (loading && step === stepNum) return "⏳";
    if (step >= stepNum) return "✅";
    return "⭕";
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>MPC Session Demo</h1>
        
        <div className={styles.steps}>
          <h3>Initialization</h3>
          <div className={styles.stepList}>
            <div className={`${styles.step} ${step >= 1 ? styles.completed : ''} ${loading && step === 1 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(1)}</span>
              <span>Create Owner Client</span>
            </div>
            <div className={`${styles.step} ${step >= 2 ? styles.completed : ''} ${loading && step === 2 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(2)}</span>
              <span>Setup MPC Session</span>
            </div>
            <div className={`${styles.step} ${step >= 3 ? styles.completed : ''} ${loading && step === 3 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(3)}</span>
              <span>Store Session Data</span>
            </div>
            <div className={`${styles.step} ${step >= 4 ? styles.completed : ''} ${loading && step === 4 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(4)}</span>
              <span>Grant Permissions</span>
            </div>
          </div>

          <h3>Transaction</h3>
          <div className={styles.stepList}>
            <div className={`${styles.step} ${step >= 5 ? styles.completed : ''} ${loading && step === 5 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(5)}</span>
              <span>Initialize Session Client</span>
            </div>
            <div className={`${styles.step} ${step >= 6 ? styles.completed : ''} ${loading && step === 6 ? styles.loading : ''}`}>
              <span className={styles.stepIcon}>{getStepStatus(6)}</span>
              <span>Send Increment TX</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          {!sessionData ? (
            <button className={styles.button} onClick={initializeSession} disabled={loading}>
              {loading ? "Initializing..." : "Start Session"}
            </button>
          ) : (
            <button className={styles.button} onClick={sendIncrementTx} disabled={loading}>
              {loading ? "Processing..." : "Increment Counter"}
            </button>
          )}
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {txHash && (
          <div className={styles.success}>
            Transaction Hash: <code>{txHash}</code>
          </div>
        )}
      </div>
    </main>
  );
}
