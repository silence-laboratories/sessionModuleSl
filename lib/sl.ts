// lib/silenceLabs.ts
import { v4 as uuidv4 } from "uuid";
import { LocalAccount, privateKeyToAccount, publicKeyToAddress, toAccount } from 'viem/accounts';
import { secp256k1 } from '@noble/curves/secp256k1';
import {
    Address,
    bytesToHex,
    hashMessage,
    hashTypedData,
    keccak256,
    serializeSignature,
    serializeTransaction,
    Signature,
    stringToHex,
    toHex,
  } from 'viem';
  import { Base64 } from 'js-base64';

import { 
  WalletProviderServiceClient,
  EOAAuth,
  EphKeyClaim,
  generateEphPrivateKey,
  getEphPublicKey,
  NetworkSigner,
  SignRequestBuilder,
  computeAddress,
  SignResponse,
} from "@silencelaboratories/walletprovider-sdk";
import { BrowserWallet } from "./browserWallet";

// Silence Labs cluster configuration (update if needed)
const clusterConfig = {
  walletProviderId: "WalletProvider",
  walletProviderUrl: "ws://34.118.117.249", // Replace with your endpoint
  apiVersion: "v1",
};

const THRESHOLD = 2;
const PARTIES_NUMBER = 3;

export async function createSilenceLabsSigner(): Promise<any> {
  const demoWalletPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
  const browserWallet = new BrowserWallet(demoWalletPrivateKey);
  const account = privateKeyToAccount("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393");
  const ownerAddress = account.address;

  // Generate an ephemeral key for signing
  const algSign = "secp256k1"; // Changed to string for ephemeral key generation
  const ephemeralPrivateKey = generateEphPrivateKey(algSign);
  const ephemeralPublicKey = getEphPublicKey(ephemeralPrivateKey, algSign);
  const ephId = uuidv4();
  const ephClaim = new EphKeyClaim(ephId, ephemeralPublicKey, algSign, 60 * 60);

  // Create the EOAAuth instance using the BrowserWallet
  const eoaAuth = new EOAAuth(ownerAddress, browserWallet, { ephClaim });

  // Create the wallet provider service client
  const walletProviderClient = new WalletProviderServiceClient({
    walletProviderId: "WalletProvider",
    walletProviderUrl: "ws://34.118.117.249",
    apiVersion: "v1",
  });

  // Create the NetworkSigner instance
  const networkSigner = new NetworkSigner(walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
  const signAlg = "secp256k1";
  // Perform key generation without permission arguments
  const keygenResponse = await networkSigner.generateKey([signAlg]); // Changed to remove algSign
  keygenResponse[0].keyId = String(keygenResponse[0].keyId);
  console.log("Silence Labs keygen response:", keygenResponse);

  return { networkSigner, keygenResponse };
}

export function createViemAccount(
    networkSigner: NetworkSigner,
    keyId: string,
    publicKey: string,
    signAlg: string = 'secp256k1',
  ): LocalAccount {
    
    const publicKeyHex = `0x${publicKey}`; // Ensure proper hex format
    const address = publicKeyToAddress(publicKeyHex as `0x${string}`);
    console.log("Generated MPC Address:", address); // Debug log
    console.log("Address:", address);
    return toAccount({
      address,
      keyId,
      async signMessage({ message }) {
        console.log("signMessage",message)
        message = (() => {
          if (typeof message === "string") {
            return stringToHex(message);
          }
          if (typeof message.raw === "string") {
            return message.raw;
          }
          return bytesToHex(message.raw);
        })();
        if(message.slice(0,2) === "0x"){
          message = message.slice(2);
        }
        console.log("signMessage112",message)
        const signRequest = new SignRequestBuilder()
        .setRequest(uuidv4(), message, "rawBytes")
        .build();        
        console.log("Sign Request signMessage", signRequest);
        console.log("network signer",networkSigner)
        const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
        console.log("Sign:", sign);
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
          // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
          // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
          if (transaction.type === 'eip4844') {
            return {
              ...transaction,
              sidecars: false,
            };
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
        const signRequest = new SignRequestBuilder().setRequest(address, hashTypedData(typedData), 'EIP712').build();
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
    const signb64 = signResp.sign;
    const sign = Base64.decode(signb64);
    const r = toHex(sign.slice(0, 32));
    const s = toHex(sign.slice(32, 64));
    const recid = signResp.recid;
    const signature: Signature = {
      r,
      s,
      v: recid === 0 ? BigInt(27) : BigInt(28),
      yParity: recid,
    };
    return signature;
  }
  