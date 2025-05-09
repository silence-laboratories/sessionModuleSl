declare module '@biconomy/abstractjs' {
  import { Address } from 'viem';
  
  export interface NexusAccount {
    getAddress(): Promise<Address>;
  }
  
  export interface SmartAccountClient {
    installModule(options: { module: any }): Promise<string>;
    waitForUserOperationReceipt(options: { hash: string }): Promise<{ success: boolean }>;
    extend(actions: any): any;
  }
  
  export interface SessionClient {
    grantPermission(options: {
      redeemer: Address;
      actions: Array<{
        actionTarget: Address;
        actionTargetSelector: string;
        actionPolicies: Array<any>;
      }>;
    }): Promise<any>;
  }
  
  export function createSmartAccountClient(options: {
    account: any;
    transport: any;
  }): SmartAccountClient;
  
  export function toNexusAccount(options: {
    signer: any;
    chain: any;
    transport: any;
  }): Promise<NexusAccount>;
  
  export function smartSessionActions(): any;
  
  export function toSmartSessionsModule(options: {
    signer: any;
  }): any;
  
  export function getSudoPolicy(): any;
}
