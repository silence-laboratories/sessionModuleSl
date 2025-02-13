// lib/silenceLabs.ts
import { v4 as uuidv4 } from "uuid";
import { LocalAccount, privateKeyToAccount, publicKeyToAddress, toAccount } from 'viem/accounts';
import { secp256k1 } from '@noble/curves/secp256k1';
import {
    Address,
    hashMessage,
    hashTypedData,
    keccak256,
    serializeSignature,
    serializeTransaction,
    Signature,
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

export async function createSilenceLabsSigner() {

  const demoWalletPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393"; // Replace with a demo key
  const browserWallet = new BrowserWallet(demoWalletPrivateKey);
  const account = privateKeyToAccount("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393")


  const ownerAddress =account.address; 

  // Generate an ephemeral key for signing.
  const algSign = ["secp256k1"];
  const ephemeralPrivateKey = generateEphPrivateKey("ed25519");
  const ephemeralPublicKey = getEphPublicKey(ephemeralPrivateKey, "secp256k1");
  const ephId = uuidv4();

  // Create an ephemeral key claim with a 1‑hour lifetime.
  const ephClaim = new EphKeyClaim(ephId, ephemeralPublicKey, "secp256k1", 60 * 60);

  // Create the EOAAuth instance using the BrowserWallet.
  const eoaAuth = new EOAAuth(ownerAddress, browserWallet, { ephClaim });

  // Create the wallet provider service client.
  const walletProviderClient = new WalletProviderServiceClient({
    walletProviderId: "WalletProvider",
    walletProviderUrl: "ws://34.118.117.249",
    apiVersion: "v1",
});

  // Create the NetworkSigner instance.
  const networkSigner = new NetworkSigner(walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
  
  // Perform key generation without any permission arguments.
  const keygenResponse = await networkSigner.generateKey(algSign);
  console.log("Silence Labs keygen response:", keygenResponse);

  return networkSigner;
}

// Sign a message using the Silence Labs signer.
export async function signMessageWithSilenceLabs(message : any) {
  const networkSigner = await createSilenceLabsSigner();
  const signReq = new SignRequestBuilder()
    .setRequest(uuidv4(), message, "rawBytes")
    .build();

  const algSign = ["secp256k1"];
  const keygenResponse = await networkSigner.generateKey(algSign);
  const primaryKey = keygenResponse[0];

  const [signatureResult] = await networkSigner.signMessage(primaryKey.keyId, "secp256k1", signReq);
  return signatureResult.sign;
}

export function createViemAccount(
    networkSigner: NetworkSigner,
    keyId: string,
    publicKey: string,
    signAlg: string = 'secp256k1',
  ): LocalAccount {
    const address = computeAddress(publicKey);
    return toAccount({
      address,
      keyId,
      async signMessage({ message }) {
        const signRequest = new SignRequestBuilder().setRequest(address, hashMessage(message), 'EIP191').build();
        const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
        if (sign) {
          const signature = formatViemSign(sign);
          return serializeSignature(signature);
        }
        throw new Error('No signature returned from network');
      },
      async signTransaction(transaction, args) {
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
  