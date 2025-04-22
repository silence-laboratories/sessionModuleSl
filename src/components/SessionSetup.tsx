
import React from 'react';
import { Check, Download, Shield, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

type SessionSetupProps = {
  mpcSigner: any;
  sessionDetails: any;
  sessionDownloaded: boolean;
  loading: string;
  initializeMPCSigner: () => Promise<void>;
  createSmartSession: () => Promise<void>;
  downloadSessionFile: () => void;
};

const SessionSetup: React.FC<SessionSetupProps> = ({
  mpcSigner,
  sessionDetails,
  sessionDownloaded,
  loading,
  initializeMPCSigner,
  createSmartSession,
  downloadSessionFile,
}) => {
  const getStepStatus = (step: number) => {
    if (step === 1) {
      if (loading === 'Initializing MPC Signer...') return 'loading';
      if (mpcSigner) return 'success';
    } else if (step === 2) {
      if (loading === 'Creating Smart Session...') return 'loading';
      if (sessionDetails) return 'success';
    } else if (step === 3) {
      if (sessionDownloaded) return 'success';
    }
    return 'idle';
  };

  return (
    <div className="session-card mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-blockchain-purple" />
        <h2 className="text-lg font-semibold">Session Setup</h2>
      </div>

      <div className="space-y-6">
        {/* Step 1: Initialize MPC Signer */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blockchain-purple text-white text-sm font-medium">
                1
              </span>
              <h3 className="font-medium text-gray-900">Initialize MPC Signer</h3>
              {getStepStatus(1) !== 'idle' && (
                <StatusBadge 
                  status={getStepStatus(1)}
                  loadingText="Initializing..." 
                  successText="Ready"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Create a cryptographic key pair for secure multi-party computation
            </p>
          </div>
          <button
            onClick={initializeMPCSigner}
            disabled={!!mpcSigner || loading !== ''}
            className="primary-button flex items-center gap-2 min-w-[160px] justify-center"
          >
            {getStepStatus(1) === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : getStepStatus(1) === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <KeyRound className="h-4 w-4" />
            )}
            {getStepStatus(1) === 'success' ? 'MPC Signer Ready' : 'Initialize'}
          </button>
        </div>

        {/* Step 2: Create Smart Session */}
        <div className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${!mpcSigner ? 'opacity-50' : ''}`}>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${mpcSigner ? 'bg-blockchain-blue' : 'bg-gray-300'} text-white text-sm font-medium`}>
                2
              </span>
              <h3 className="font-medium text-gray-900">Create Smart Session</h3>
              {getStepStatus(2) !== 'idle' && (
                <StatusBadge 
                  status={getStepStatus(2)}
                  loadingText="Creating..." 
                  successText="Created"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Set up a secure session with permissions for the MPC signer
            </p>
          </div>
          <button
            onClick={createSmartSession}
            disabled={!mpcSigner || !!sessionDetails || loading !== ''}
            className="secondary-button flex items-center gap-2 min-w-[160px] justify-center"
          >
            {getStepStatus(2) === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : getStepStatus(2) === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            {getStepStatus(2) === 'success' ? 'Session Created' : 'Create Session'}
          </button>
        </div>

        {/* Step 3: Download Session */}
        <div className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${!sessionDetails ? 'opacity-50' : ''}`}>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${sessionDetails ? 'bg-green-600' : 'bg-gray-300'} text-white text-sm font-medium`}>
                3
              </span>
              <h3 className="font-medium text-gray-900">Download Session Info</h3>
              {getStepStatus(3) !== 'idle' && (
                <StatusBadge 
                  status={getStepStatus(3)}
                  successText="Downloaded"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-8">
              Download the session file required for backend processing
            </p>
          </div>
          <button
            onClick={downloadSessionFile}
            disabled={!sessionDetails}
            className="success-button flex items-center gap-2 min-w-[160px] justify-center"
          >
            {getStepStatus(3) === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download File
          </button>
        </div>
        
        {/* Next Step Indicator */}
        {sessionDownloaded && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-blockchain-purple">
              <p className="text-sm font-medium">Proceed to Chat Interface</p>
              <ArrowRight className="h-5 w-5 animate-bounce-horizontal" />
            </div>
          </div>
        )}

        {/* Info Text */}
        {sessionDetails && (
          <div className="mt-2 text-xs text-muted-foreground">
            <p>
              The session file contains the session info, MPC signer data, key generation details, 
              and full key configuration required for backend processing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { SessionSetup };
