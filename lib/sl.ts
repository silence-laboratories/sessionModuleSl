// lib/silenceLabs.ts
import { v4 as uuidv4 } from "uuid";
import { LocalAccount, privateKeyToAccount, toAccount, publicKeyToAddress } from 'viem/accounts';
import { secp256k1 } from '@noble/curves/secp256k1';
import {
  WalletProviderServiceClient,
  EOAAuth,
  EphKeyClaim,
  generateEphPrivateKey,
  getEphPublicKey,
  NetworkSigner,
  SignRequestBuilder,
  EphAuth,
  computeAddress,
  SignResponse,
} from "@silencelaboratories/walletprovider-sdk";
import { BrowserWallet } from "./browserWallet";
import { bytesToHex, stringToHex, toHex, keccak256, serializeSignature, serializeTransaction, hashTypedData, Signature, Hex } from "viem";
import { Base64 } from "js-base64";

// Cluster configuration
const clusterConfig = {
  walletProviderId: "WalletProvider",
  walletProviderUrl: "ws://34.118.117.249", // update if needed
  apiVersion: "v1",
};

const THRESHOLD = 2;
const PARTIES_NUMBER = 3;

// Key configuration interface
export interface KeyConfiguration {
  publicKey: string;
  keyId: string;
  ephemeralKeyId: string;
  // Store the ephemeral private key as a hex string (without 0x)
  ephemeralPrivateKey: string;
  signerAddress: string;
  t: number;
  n: number;
  sessionAddress: string;
}

// Save/load key config from browser storage
export const saveKeyConfig = (config: KeyConfiguration) => {
  localStorage.setItem("keyConfig", JSON.stringify(config));
};

export const loadKeyConfig = (): KeyConfiguration | null => {
  const raw = localStorage.getItem("keyConfig");
  return raw ? JSON.parse(raw) : null;
};

// Utility: convert hex string to Uint8Array
function hexToBytes(hexString: string): Uint8Array {
  if (hexString.startsWith("0x")) hexString = hexString.slice(2);
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * generateCryptographicKey
 * Uses an EOAAuth flow (with a BrowserWallet) to generate the key pair.
 * Also generates an ephemeral key and then saves the key configuration in localStorage.
 */
export async function generateCryptographicKey(): Promise<{ keyConfig: KeyConfiguration; eoaNetworkSigner: NetworkSigner }> {
  // Use a demo wallet private key (in production, obtain securely)
  const demoWalletPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
  const browserWallet = new BrowserWallet(demoWalletPrivateKey);
  const account = privateKeyToAccount(demoWalletPrivateKey);
  const ownerAddress = account.address;

  // Generate an ephemeral key for later signing
  const algSign = "secp256k1";
  const ephemeralPrivateKey = generateEphPrivateKey(algSign);
  const ephemeralPublicKey = getEphPublicKey(ephemeralPrivateKey, algSign);
  const ephId = uuidv4();
  const ephClaim = new EphKeyClaim(ephId, ephemeralPublicKey, algSign, 60 * 60);

  // Create the EOAAuth instance for key generation using the EOA (BrowserWallet)
  const eoaAuth = new EOAAuth(ownerAddress, browserWallet, { ephClaim });

  const walletProviderClient = new WalletProviderServiceClient({
    walletProviderId: clusterConfig.walletProviderId,
    walletProviderUrl: clusterConfig.walletProviderUrl,
    apiVersion: "v1",
  });

  // Create network signer (using EOAAuth) to call generateKey
  const eoaNetworkSigner = new NetworkSigner(walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
  const signAlg = "secp256k1";
  const keygenResponse = await eoaNetworkSigner.generateKey([signAlg]);
  const [primaryKey] = keygenResponse;
  primaryKey.keyId = String(primaryKey.keyId);

  console.log("Silence Labs keygen response:", keygenResponse);

  // Build key configuration object
  const keyConfig: KeyConfiguration = {
    publicKey: primaryKey.publicKey,
    keyId: primaryKey.keyId,
    ephemeralKeyId: ephId,
    ephemeralPrivateKey: Buffer.from(ephemeralPrivateKey).toString("hex"),
    signerAddress: ownerAddress,
    t: THRESHOLD,
    n: PARTIES_NUMBER,
    sessionAddress: computeAddress(primaryKey.publicKey),
  };

  // Store configuration in browser storage
  saveKeyConfig(keyConfig);

  return { keyConfig, eoaNetworkSigner };
}

/**
 * createSignerForSign
 * Loads the key configuration from localStorage and creates a NetworkSigner using EphAuth
 * for signing operations.
 */
export async function createSignerForSign(): Promise<{ networkSigner: NetworkSigner; keyId: string; publicKey: string }> {
  const config = loadKeyConfig();
  if (!config) {
    throw new Error("Key configuration not found. Please generate keys first.");
  }
  const ephemeralPrivateKeyBytes = hexToBytes(config.ephemeralPrivateKey);
  const ephAuth = new EphAuth(config.ephemeralKeyId, ephemeralPrivateKeyBytes, "secp256k1");

  const walletProviderClient = new WalletProviderServiceClient({
    walletProviderId: clusterConfig.walletProviderId,
    walletProviderUrl: clusterConfig.walletProviderUrl,
    apiVersion: "v1",
  });

  const networkSigner = new NetworkSigner(walletProviderClient, config.t, config.n, ephAuth);
  return { networkSigner, keyId: config.keyId, publicKey: config.publicKey };
}

/**
 * createViemAccount
 * Creates a Viem-compatible account object from the given network signer.
 */
export function createViemAccount(
  networkSigner: NetworkSigner,
  keyId: string,
  publicKey: string,
  signAlg: string = 'secp256k1',
): LocalAccount {
  const publicKeyHex = `0x${publicKey}`;
  const address = publicKeyToAddress(publicKeyHex as `0x${string}`);
  console.log("Generated MPC Address:", address);
  return toAccount({
    address,
    keyId,
    async signMessage({ message }) {
      console.log("signMessage", message);
      message = (() => {
        if (typeof message === "string") {
          return stringToHex(message);
        }
        if (typeof message.raw === "string") {
          return message.raw;
        }
        return bytesToHex(message.raw);
      })();
      if (message.slice(0, 2) === "0x") {
        message = message.slice(2);
      }
      console.log("Processed message:", message);
      const signRequest = new SignRequestBuilder()
        .setRequest(uuidv4(), message, "rawBytes")
        .build();
      console.log("Sign Request:", signRequest);
      console.log("Using network signer:", networkSigner);
      const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
      console.log("Signature response:", sign);
      if (sign) {
        const signature = formatViemSign(sign);
        return serializeSignature(signature);
      }
      throw new Error('No signature returned from network');
    },
    async signTransaction(transaction, args) {
      console.log("Sign Transaction", transaction);
      const serializer = args?.serializer || serializeTransaction;
      const signableTransaction = (() => {
        if (transaction.type === 'eip4844') {
          return { ...transaction, sidecars: false };
        }
        return transaction;
      })();
      const signRequest = new SignRequestBuilder()
        .setRequest(address, keccak256(serializer(signableTransaction)), 'EIP191')
        .build();
      const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
      if (sign) {
        const signature = formatViemSign(sign);
        return serializer(transaction, signature);
      }
      throw new Error('No signature returned from network');
    },
    async signTypedData(typedData) {
      console.log("Sign Typed Data", typedData);
      const signRequest = new SignRequestBuilder()
        .setRequest(address, hashTypedData(typedData), 'EIP712')
        .build();
      const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
      if (sign) {
        const signature = formatViemSign(sign);
        return serializeSignature(signature);
      }
      throw new Error('No signature returned from network');
    },
  });
}

function formatViemSign(signResp: SignResponse): Signature {
  const sign =  signResp.sign
  const hexSig = sign.startsWith("0x") ? sign.slice(2) : sign;
  const r = "0x" + hexSig.slice(0, 64) as Hex; // first 64 hex characters = 32 bytes
  const s = "0x" + hexSig.slice(64, 128) as Hex; // next 64 hex characters = 32 bytes
  const recid = signResp.recid;
  const signature = {
    r,
    s,
    v: recid === 0 ? BigInt(27) : BigInt(28),
    yParity: recid,
  };
  return signature;
}
