// lib/biconomy.ts
import { createSmartAccountClient, toNexusAccount, smartSessionCreateActions } from "@biconomy/abstractjs";
import { baseSepolia, sepolia } from "viem/chains";
import { encodeFunctionData, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createSilenceLabsSigner, createViemAccount } from "./sl";
import { stringify } from "@biconomy/abstractjs";

const COUNTER_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const BUNDLER_URL = "https://paymaster.biconomy.io/api/v2/11155111/f3uubFyRm.c7d709d6-0245-47fc-adc6-9dc96fc6155c";
const ownerAccount = privateKeyToAccount("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393");

export async function createNexusClient() {
  
  return createSmartAccountClient({
    account: await toNexusAccount({
      signer: ownerAccount,
      chain: sepolia,
      transport: http()
    }),
    transport: http(BUNDLER_URL)
  });
}

export async function setupMPCSession(ownerClient: any) {
  // Generate MPC keys using Silence Labs
  const { networkSigner, keygenResponse } = await createSilenceLabsSigner();
  
  // Fix: Treat keygenResponse as an object, not an array
  const primaryKey = keygenResponse; // Changed from keygenResponse[0]
  console.log("Primary Key:", primaryKey[0].publicKey);
  const mpcAccount = createViemAccount(
    networkSigner,
    primaryKey[0].keyId,
    primaryKey[0].publicKey,
    'secp256k1'
  );

  // Create session module
  const nexusClient = await createNexusClient();
  const sessionsModule = (await import("@biconomy/abstractjs")).toSmartSessionsValidator({
    account: nexusClient.account,
    signer: ownerAccount
  });
  const hash = await nexusClient.installModule({
    module: sessionsModule.moduleInitData
  })
  const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({ hash })
  
  const extendedSessionClient = ownerClient.extend(
    (await import("@biconomy/abstractjs")).smartSessionCreateActions(sessionsModule)
  );
  return {
    extendedSessionClient,
    mpcAccount,
    networkSigner,
    primaryKey
  };
}
// lib/biconomy.ts update
export async function createSessionClient(sessionData: SessionData) {
  const client = createSmartAccountClient({
    account: await toNexusAccount({
      signer: sessionData.mpcAccount,
      chain: sepolia, // Consistent chain
      transport: http(),
    }),
    transport: http(BUNDLER_URL)
  });

  // const useModule = (await import("@biconomy/abstractjs")).toSmartSessionsValidator({
  //   account: client.account,
  //   signer: sessionData.mpcAccount,
  //   moduleData: {
  //     permissionIds: sessionData.moduleData.permissionId,
  //     mode: sessionData.moduleData.mode as `0x${string}`
  //   }
  // });

  // return client.extend(
  //   (await import("@biconomy/abstractjs")).smartSessionUseActions(useModule)
  // );
}

//create session data type
export interface SessionData {
  granter: string;
  sessionPublicKey: string;
  description?: string;
  moduleData: {
    permissionId: string;
    validUntil: number;
    mode: string;
  };
  mpcAccount: any;
  networkSigner: any;
}