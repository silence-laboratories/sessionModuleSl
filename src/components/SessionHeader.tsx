
import React from 'react';
import { Shield } from 'lucide-react';

const SessionHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="h-8 w-8 text-blockchain-purple" />
        <h1 className="text-3xl font-bold text-gradient">
          MPC-Powered Smart Session
        </h1>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Securely orchestrate transactions using Multi-Party Computation and Smart Sessions.
        Set up your session and interact with the backend through the chat interface.
      </p>
    </div>
  );
};

export { SessionHeader };
