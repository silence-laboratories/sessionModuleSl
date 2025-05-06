import React from "react";
import { Check, Shield, KeyRound, Loader2 } from "lucide-react";
import { StatusBadge } from "./ui/StatusBadge";

type Props = {
  mpcSigner: any;
  sessionDetails: any;
  loading: string;
  initializeMPCSigner: () => Promise<void>;
  createSmartSession: () => Promise<void>;
};

export const SessionSetup: React.FC<Props> = ({
  mpcSigner,
  sessionDetails,
  loading,
  initializeMPCSigner,
  createSmartSession,
}) => {
  const status = (step: 1 | 2) => {
    if (step === 1) {
      if (loading.startsWith("Initializing")) return "loading";
      if (mpcSigner) return "success";
    }
    if (step === 2) {
      if (loading.startsWith("Creating") || loading.startsWith("Finalising"))
        return "loading";
      if (sessionDetails) return "success";
    }
    return "idle";
  };

  return (
    <div className="session-card mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-blockchain-purple" />
        <h2 className="text-lg font-semibold">Session Setup</h2>
      </div>

      <div className="space-y-6">
        {/* step 1 */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blockchain-purple text-white text-sm font-medium">
                1
              </span>
              <h3 className="font-medium text-gray-900">Initialize MPC Signer</h3>
              {status(1) !== "idle" && (
                <StatusBadge
                  status={status(1)}
                  loadingText="Initializing…"
                  successText="Ready"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Generate a threshold key pair for secure multi-party signing.
            </p>
          </div>
          <button
            onClick={initializeMPCSigner}
            disabled={!!mpcSigner || !!loading}
            className="primary-button flex items-center gap-2 min-w-[160px] justify-center"
          >
            {status(1) === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status(1) === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <KeyRound className="h-4 w-4" />
            )}
            {status(1) === "success" ? "MPC Signer Ready" : "Initialize"}
          </button>
        </div>

        {/* step 2 */}
        <div
          className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${
            !mpcSigner ? "opacity-50" : ""
          }`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                  mpcSigner ? "bg-blockchain-blue" : "bg-gray-300"
                } text-white text-sm font-medium`}
              >
                2
              </span>
              <h3 className="font-medium text-gray-900">Create Smart Session</h3>
              {status(2) !== "idle" && (
                <StatusBadge
                  status={status(2)}
                  loadingText="Creating…"
                  successText="Created"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Grant the MPC signer limited permissions on your Smart Account.
            </p>
          </div>
          <button
            onClick={createSmartSession}
            disabled={!mpcSigner || !!sessionDetails || !!loading}
            className="secondary-button flex items-center gap-2 min-w-[160px] justify-center"
          >
            {status(2) === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status(2) === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            {status(2) === "success" ? "Session Created" : "Create Session"}
          </button>
        </div>

        {sessionDetails && (
          <p className="text-xs text-muted-foreground ml-8">
            Session data syncs to backend automatically.
          </p>
        )}
      </div>
    </div>
  );
};
