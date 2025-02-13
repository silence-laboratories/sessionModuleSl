// lib/biconomy.ts
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient, toNexusAccount, smartSessionCreateActions, toSmartSessionsValidator } from "@biconomy/abstractjs";
import { baseSepolia, sepolia } from "viem/chains";
import { http } from "viem";
import { generateKey } from "crypto";
import { createSilenceLabsSigner,createViemAccount } from "./sl";

async function getMPCSessionSigner() {
  const networkSigner = await createSilenceLabsSigner();
  
  // Generate a key for this session
  const algSign = ["secp256k1"];
  const keygenResponse = await networkSigner.generateKey(algSign);
  const primaryKey = keygenResponse[0];
  
  return { networkSigner, primaryKey };
}

// Owner's private key (for demo purposes, use secure storage in production)
const privateKey = generatePrivateKey();
console.log("private key",privateKey)
const OWNER_PRIVATE_KEY = privateKey// Replace with your private key
const ownerAccount = privateKeyToAccount("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393");

// Biconomy bundler URL (replace with your actual bundler endpoint)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

export async function createOwnerNexusClient() {
  const nexusClient = createSmartAccountClient({
    account: await toNexusAccount({
      signer: ownerAccount,
      chain: sepolia,
      transport: http(),
    }),
    transport: http(bundlerUrl),
  });
  return nexusClient;
}

// Install the smart sessions module using the custom session signer (from Silence Labs).
export async function installSmartSessionModule(nexusClient: any) {
  // Get our MPC signer and create a Viem-compatible account
  const networkSigner = await createSilenceLabsSigner();
  const keygenResponse = await networkSigner.generateKey(["secp256k1"]);
  const primaryKey = keygenResponse[0];
  
  // Create a Viem-compatible account using the MPC signer
  const mpcViemAccount = createViemAccount(
    networkSigner,
    primaryKey.keyId,
    primaryKey.publicKey,
    'secp256k1'
  );

  // Create the sessions module with Viem-compatible MPC signer
  const sessionsModule = toSmartSessionsValidator({
    account: nexusClient.account,
    signer: ownerAccount, // Using the Viem-compatible account
  });

  const hash = await nexusClient.installModule({ module: sessionsModule.moduleInitData });
  await nexusClient.waitForUserOperationReceipt({ hash });
  const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));
  
  return { 
    nexusSessionClient, 
    sessionsModule,
    sessionSigner: mpcViemAccount,
    keyId: primaryKey.keyId
  };
}

// Create a client for using the session (for sending transactions).
export async function createSessionUsageClient() {
  const nexusClient = await createOwnerNexusClient();
  return nexusClient;
}
