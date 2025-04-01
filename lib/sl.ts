// lib/sl.ts

import { v4 as uuidv4 } from "uuid";
import {
  LocalAccount,
  privateKeyToAccount,
  toAccount,
  publicKeyToAddress
} from "viem/accounts";
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
  SignResponse
} from "@silencelaboratories/walletprovider-sdk";
import {
  bytesToHex,
  stringToHex,
  hexToBytes,
  keccak256,
  serializeSignature,
  serializeTransaction,
  hashTypedData,
  Signature,
  Hex
} from "viem";
import { BrowserWallet } from "./browserWallet";

/** Minimal cluster config */
const clusterConfig = {
  walletProviderId: "WalletProvider",
  walletProviderUrl: "ws://34.118.117.249", // or your cluster
  apiVersion: "v1",
};

const THRESHOLD = 2;
const PARTIES_NUMBER = 3;

/** Key config shape stored in localStorage */
export interface KeyConfiguration {
  publicKey: string;
  keyId: string;
  ephemeralKeyId: string;
  ephemeralPrivateKey: string; // hex (no "0x")
  signerAddress: string;
  t: number;
  n: number;
  sessionAddress: string;
}

/** Save/load config */
export function saveKeyConfig(cfg: KeyConfiguration) {
  localStorage.setItem("keyConfig", JSON.stringify(cfg));
}
export function loadKeyConfig(): KeyConfiguration | null {
  const raw = localStorage.getItem("keyConfig");
  return raw ? JSON.parse(raw) : null;
}

function hexToBytesNo0x(hex: string): Uint8Array {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/**
 * generateCryptographicKey()
 * 1) EOAAuth with a local "demo" private key (for simplicity).
 * 2) Silence Labs keygen => store KeyConfiguration in localStorage.
 */
export async function generateCryptographicKey(): Promise<{
  keyConfig: KeyConfiguration;
  eoaNetworkSigner: NetworkSigner;
}> {
  // For demonstration only – in production, use a real user wallet
  const demoWalletPrivKey =
    "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
  const browserWallet = new BrowserWallet(demoWalletPrivKey);
  const account = privateKeyToAccount(demoWalletPrivKey);
  const ownerAddress = account.address;

  // Create ephemeral key for multi-round signing
  const signAlg = "secp256k1";
  const ephemeralPrivKey = generateEphPrivateKey(signAlg);
  const ephemeralPubKey = getEphPublicKey(ephemeralPrivKey, signAlg);
  const ephemeralId = uuidv4();
  const ephClaim = new EphKeyClaim(ephemeralId, ephemeralPubKey, signAlg, 60 * 60);

  const eoaAuth = new EOAAuth(ownerAddress, browserWallet, { ephClaim });
  const wpClient = new WalletProviderServiceClient({
    walletProviderId: clusterConfig.walletProviderId,
    walletProviderUrl: clusterConfig.walletProviderUrl,
    apiVersion: "v1",
  });

  const eoaNetworkSigner = new NetworkSigner(
    wpClient,
    THRESHOLD,
    PARTIES_NUMBER,
    eoaAuth
  );
  const keygenResp = await eoaNetworkSigner.generateKey([signAlg]);
  const [primaryKey] = keygenResp;
  primaryKey.keyId = String(primaryKey.keyId);

  const keyConfig: KeyConfiguration = {
    publicKey: primaryKey.publicKey,
    keyId: primaryKey.keyId,
    ephemeralKeyId: ephemeralId,
    ephemeralPrivateKey: Buffer.from(ephemeralPrivKey).toString("hex"),
    signerAddress: ownerAddress,
    t: THRESHOLD,
    n: PARTIES_NUMBER,
    sessionAddress: computeAddress(primaryKey.publicKey),
  };

  saveKeyConfig(keyConfig);
  return { keyConfig, eoaNetworkSigner };
}

/**
 * createSignerForSign()
 * Re-hydrates the ephemeral key & returns a NetworkSigner
 */
export async function createSignerForSign(): Promise<{
  networkSigner: NetworkSigner;
  keyId: string;
  publicKey: string;
}> {
  const cfg = loadKeyConfig();
  if (!cfg) throw new Error("Key config missing. Please run generateCryptographicKey first.");

  const ephemeralPrivKeyBytes = hexToBytesNo0x(cfg.ephemeralPrivateKey);
  const ephAuth = new EphAuth(cfg.ephemeralKeyId, ephemeralPrivKeyBytes, "secp256k1");

  const wpClient = new WalletProviderServiceClient({
    walletProviderId: clusterConfig.walletProviderId,
    walletProviderUrl: clusterConfig.walletProviderUrl,
    apiVersion: "v1",
  });

  const networkSigner = new NetworkSigner(wpClient, cfg.t, cfg.n, ephAuth);
  return {
    networkSigner,
    keyId: cfg.keyId,
    publicKey: cfg.publicKey,
  };
}

/**
 * createViemAccount – produce a viem-compatible `account` object that signs raw 32-byte hashes.
 */
export function createViemAccount(
  networkSigner: NetworkSigner,
  keyId: string,
  publicKey: string,
  signAlg = "secp256k1"
): LocalAccount {
  const pubHex = `0x${publicKey}` as `0x${string}`;
  const address = computeAddress(publicKey)
  console.log("MPC Address =>", address);

  return toAccount({
    address,

    // A) signMessage: we do raw ecdsa on the 32 bytes
    async signMessage({ message }) {
      console.log("MPC signMessage:", message);

      const hexMsg = normalizeToHex(message);
      const signReq = new SignRequestBuilder()
        .setRequest(uuidv4(), hexMsg, "EIP191")
        .build();

      const [resp] = await networkSigner.signMessage(keyId, signAlg, signReq);
      if (!resp) throw new Error("Silence Labs returned empty signature.");

      const flattenSignature = (signgenResponse: SignResponse): `0x${string}` => {
        const { sign, recid } = signgenResponse;
        const recid_hex = (27 + recid).toString(16);
        return `0x${sign}${recid_hex}`;
      };
    
      const res = flattenSignature(resp)
      return res;
    },

    // B) signTransaction: same approach -> raw ecdsa of keccak(rlp)
    async signTransaction(tx, args) {
      console.log("MPC signTransaction:", tx);

      const serializer = args?.serializer || serializeTransaction;
      const signableTx = tx.type === "eip4844"
        ? { ...tx, sidecars: false }
        : tx;

      const txHash = keccak256(serializer(signableTx));
      // sign raw 32 bytes
      const signReq = new SignRequestBuilder()
        .setRequest(address, txHash.slice(2), "rawBytes")
        .build();

      const [resp] = await networkSigner.signMessage(keyId, signAlg, signReq);
      if (!resp) throw new Error("No signature from Silence Labs for tx.");

      const sig = formatViemSign(resp);
      return serializer(tx, sig);
    },

    // C) signTypedData: If your aggregator doesn't handle EIP712, this might fail on chain.
    async signTypedData(typedData) {
      console.log("MPC signTypedData:", typedData);
      const dataHash = hashTypedData(typedData);

      const signReq = new SignRequestBuilder()
        .setRequest(address, dataHash, "rawBytes")
        .build();

      const [resp] = await networkSigner.signMessage(keyId, signAlg, signReq);
      if (!resp) throw new Error("No signature from Silence Labs for typed data.");

      const sig = formatViemSign(resp);
      return serializeSignature(sig);
    },
  });
}

// Utility: convert any message into a 0x-string
function normalizeToHex(msg: string | Uint8Array | { raw: string | Uint8Array }): `0x${string}` {
  if (typeof msg === "string") {
    return msg.startsWith("0x")
      ? (msg as `0x${string}`)
      : (stringToHex(msg) as `0x${string}`);
  } else if (msg instanceof Uint8Array) {
    return `0x${bytesToHex(msg)}` as `0x${string}`;
  } else if ("raw" in msg) {
    const val = msg.raw;
    if (typeof val === "string") {
      return val.startsWith("0x")
        ? (val as `0x${string}`)
        : (stringToHex(val) as `0x${string}`);
    } else {
      return `0x${bytesToHex(val)}` as `0x${string}`;
    }
  }
  throw new Error("Unsupported message type for signMessage.");
}

/**
 * formatViemSign – Silence Labs returns { sign: "r||s", recid: 0|1 } => { r, s, v = 27|28 }
 */
function formatViemSign(resp: SignResponse): Signature {
  const hexSig = resp.sign.startsWith("0x") ? resp.sign.slice(2) : resp.sign;
  const r = "0x" + hexSig.slice(0, 64) as Hex;
  const s = "0x" + hexSig.slice(64, 128) as Hex;
  const recid = resp.recid; // 0 or 1
  const v = recid === 0 ? 27n : 28n;
  return { r, s, v, yParity: recid };
}