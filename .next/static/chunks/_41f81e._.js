(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_41f81e._.js", {

"[project]/lib/sl.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// sl.ts
__turbopack_esm__({
    "createSignerForSign": (()=>createSignerForSign),
    "createViemAccount": (()=>createViemAccount),
    "generateCryptographicKey": (()=>generateCryptographicKey)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@silencelaboratories/walletprovider-sdk/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/toAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$toPrefixedMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/toPrefixedMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/recoverAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/serializeSignature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/transaction/serializeTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashTypedData.js [app-client] (ecmascript)");
;
;
;
;
// (1) Silence Labs cluster config
const clusterConfig = {
    walletProviderId: "WalletProvider",
    walletProviderUrl: "ws://34.118.117.249",
    apiVersion: "v1"
};
// (2) Keygen parameters
const THRESHOLD = 2;
const PARTIES_NUMBER = 3;
// (3) Demo EOA private key for your “owner” – in production, handle securely
const DEMO_WALLET_PRIVATE_KEY = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
// (4) In-memory variables (no LocalStorage)
let ephemeralPrivateKey = null;
let ephemeralKeyId = null;
let primaryKeyPublic = null;
let primaryKeyId = null;
let signerAddress = null;
async function generateCryptographicKey() {
    // 1. Prep a “BrowserWallet-like” EOA for the EOAAuth
    const eoaAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(DEMO_WALLET_PRIVATE_KEY);
    signerAddress = eoaAccount.address;
    // 2. Generate ephemeral key
    const algSign = "secp256k1";
    ephemeralPrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateEphPrivateKey"])(algSign);
    const ephemeralPublicKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEphPublicKey"])(ephemeralPrivateKey, algSign);
    ephemeralKeyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    // Claim is only needed if you want ephemeral key recognized by the server
    // This example sets TTL = 1 hour, adjust as needed
    const ephClaim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EphKeyClaim"](ephemeralKeyId, ephemeralPublicKey, algSign, 60 * 60);
    // 3. Build EOAAuth
    const eoaAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOAAuth"](signerAddress, {
        async signMessage (msg) {
            // Example minimal sign
            return eoaAccount.signMessage({
                message: msg
            });
        }
    }, {
        ephClaim
    });
    // 4. Connect Silence Labs WebSocket client
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: clusterConfig.walletProviderId,
        walletProviderUrl: clusterConfig.walletProviderUrl,
        apiVersion: clusterConfig.apiVersion
    });
    // 5. Use EOAAuth to create a NetworkSigner
    const eoaNetworkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
    // 6. Keygen request
    const keygenResponse = await eoaNetworkSigner.generateKey([
        algSign
    ]);
    const [primaryKey] = keygenResponse;
    // Silence Labs typically returns numeric IDs; ensure they're strings if needed
    primaryKey.keyId = String(primaryKey.keyId);
    // 7. Cache returned publicKey + keyId in memory
    primaryKeyPublic = primaryKey.publicKey;
    primaryKeyId = primaryKey.keyId;
}
async function createSignerForSign() {
    if (!ephemeralPrivateKey || !ephemeralKeyId) {
        throw new Error("Ephemeral key not found. Did you call generateCryptographicKey() first?");
    }
    if (!primaryKeyPublic || !primaryKeyId) {
        throw new Error("No primary MPC key found. Did you call generateCryptographicKey() first?");
    }
    // Build ephemeral-auth
    const ephAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EphAuth"](ephemeralKeyId, ephemeralPrivateKey, "secp256k1");
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: clusterConfig.walletProviderId,
        walletProviderUrl: clusterConfig.walletProviderUrl,
        apiVersion: clusterConfig.apiVersion
    });
    const networkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, THRESHOLD, PARTIES_NUMBER, ephAuth);
    return {
        networkSigner,
        keyId: primaryKeyId,
        publicKey: primaryKeyPublic
    };
}
function createViemAccount(networkSigner, keyId, publicKey, signAlg = 'secp256k1') {
    const publicKeyHex = `0x${publicKey}`;
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyToAddress"])(publicKeyHex);
    console.log("MPC Address:", address);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toAccount"])({
        address,
        keyId,
        async signMessage ({ message }) {
            // 1) Convert message to hex
            let processedMessage = typeof message === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToHex"])(message) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])(message.raw);
            // 2) Strip 0x if present
            if (processedMessage.startsWith("0x")) {
                processedMessage = processedMessage.slice(2);
            }
            // 3) Check if the message is a 32-byte hash
            const isHash = processedMessage.length === 64;
            // 4) For non-hash messages, apply the "\x19Ethereum Signed Message" prefix
            const finalMessage = isHash ? processedMessage : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$toPrefixedMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPrefixedMessage"])(processedMessage).slice(2);
            // 5) Build the Silence Labs sign request
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(), finalMessage, "rawBytes").build();
            // 6) Ask the networkSigner to sign
            const [sign] = await networkSigner.signMessage(keyId, signAlg, signRequest);
            // 7) Recover to check correctness
            const verifiedAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverAddress"])({
                hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(finalMessage),
                signature: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])(formatViemSign(sign))
            });
            if (verifiedAddress !== address) {
                throw new Error("Signature verification failed");
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])(formatViemSign(sign));
        },
        async signTransaction (transaction, args) {
            const serializer = args?.serializer || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeTransaction"];
            const signableTransaction = transaction.type === 'eip4844' ? {
                ...transaction,
                sidecars: false
            } : transaction;
            // EIP-191 sign of the transaction hash
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])(serializer(signableTransaction)), 'EIP191').build();
            const [sign] = await networkSigner.signMessage(keyId, signAlg, signRequest);
            if (!sign) throw new Error("No signature returned from network");
            const signature = formatViemSign(sign);
            return serializer(transaction, signature);
        },
        async signTypedData (typedData) {
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashTypedData"])(typedData), 'EIP712').build();
            const [sign] = await networkSigner.signMessage(keyId, signAlg, signRequest);
            if (!sign) {
                throw new Error("No signature returned from network");
            }
            const signature = formatViemSign(sign);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])(signature);
        }
    });
}
/**
 * formatViemSign
 * Takes a Silence Labs SignResponse and reshapes it to viem’s { v,r,s } format.
 */ function formatViemSign(signResp) {
    const hexSig = signResp.sign.startsWith("0x") ? signResp.sign.slice(2) : signResp.sign;
    const r = "0x" + hexSig.slice(0, 64);
    const s = "0x" + hexSig.slice(64, 128);
    const recid = signResp.recid;
    return {
        r,
        s,
        v: BigInt(recid),
        yParity: recid
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// app/page.tsx
__turbopack_esm__({
    "default": (()=>SessionPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/sl.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/clients/createBicoBundlerClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/account/toNexusAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/toSmartSessionsValidator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/decorators/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$rhinestone$2f$module$2d$sdk$2f$_esm$2f$module$2f$smart$2d$sessions$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@rhinestone/module-sdk/_esm/module/smart-sessions/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$Helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/Helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
const CounterAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCounter",
                "type": "uint256"
            }
        ],
        "name": "Incremented",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
function SessionPage() {
    _s();
    const [mpcSigner, setMpcSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionData, setSessionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Initialize MPC Signer: generate keys (if needed) and then create the signer for signing
    const initializeMPCSigner = async ()=>{
        setLoading('Initializing MPC signer...');
        try {
            // Generate key pair (this will store config in localStorage)
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCryptographicKey"])();
            // Create a NetworkSigner using EphAuth for signing operations
            const { networkSigner, keyId, publicKey } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSignerForSign"])();
            const mpcAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createViemAccount"])(networkSigner, keyId, publicKey);
            setMpcSigner(mpcAccount);
            setLoading('');
        } catch (error) {
            console.error('MPC Signer Error:', error);
            setLoading('');
        }
    };
    // Create Biconomy Smart Session
    const createSmartSession = async ()=>{
        if (!mpcSigner) return;
        setLoading('Creating smart session...');
        try {
            // Initialize Nexus client with owner account
            const ownerPrivateKey = "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03"; // Replace with actual owner key
            const ownerAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(ownerPrivateKey);
            const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
            const ownerAccountAddress = ownerAccount.address;
            console.log("Owner Account:", ownerAccountAddress);
            const nexusClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
                account: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNexusAccount"])({
                    signer: ownerAccount,
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
                }),
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(bundlerUrl)
            });
            console.log("Nexus Client:", nexusClient.account.address);
            // Create and install sessions module
            const sessionsModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSmartSessionsValidator"])({
                account: nexusClient.account,
                signer: ownerAccount
            });
            console.log("Sessions Module:", sessionsModule.moduleInitData);
            const hash = await nexusClient.installModule({
                module: sessionsModule.moduleInitData
            });
            console.log("Module Installation Hash:", hash);
            const { success: installSuccess } = await nexusClient.waitForUserOperationReceipt({
                hash
            });
            if (!installSuccess) {
                console.error("❌ Failed to install Smart Sessions module");
                return;
            }
            console.log("✅ Smart Sessions module installed successfully");
            const nexusSessionClient = nexusClient.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionCreateActions"])(sessionsModule));
            // Create session with MPC public key
            // In createSmartSession()
            const sessionRequestedInfo = [
                {
                    sessionPublicKey: mpcSigner.address,
                    actionPoliciesInfo: [
                        {
                            contractAddress: "0x7961d826258946969fa0d80b34508094c6148bdf",
                            abi: CounterAbi,
                            sudo: true
                        }
                    ]
                }
            ];
            console.log("sessionRequestedInfo:", sessionRequestedInfo);
            console.log("MPC Session Public Key:", mpcSigner.address);
            console.log("Session Public Key in Policy:", sessionRequestedInfo[0].sessionPublicKey);
            const createSessionsResponse = await nexusSessionClient.grantPermission({
                sessionRequestedInfo
            });
            const { success } = await nexusClient.waitForUserOperationReceipt({
                hash: createSessionsResponse.userOpHash
            });
            if (!success) {
                console.error("❌ Failed to create Smart Session");
                return;
            }
            console.log("✅ Smart Session created successfully");
            // Store session data in localStorage for persistence
            const sessionData = {
                granter: nexusClient.account.address,
                sessionPublicKey: mpcSigner.address,
                moduleData: {
                    permissionIds: createSessionsResponse.permissionIds,
                    action: createSessionsResponse.action,
                    mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$rhinestone$2f$module$2d$sdk$2f$_esm$2f$module$2f$smart$2d$sessions$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartSessionMode"].USE,
                    sessions: createSessionsResponse.sessions
                }
            };
            const compressedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$Helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(sessionData);
            localStorage.setItem('mpcSessionData', compressedData);
            setSessionData(compressedData);
            setLoading('');
        } catch (error) {
            console.error('Session Creation Error:', error);
            setLoading('');
        }
    };
    // Execute Transaction with MPC Session
    const executeTransaction = async ()=>{
        if (!sessionData) return;
        setLoading('Executing transaction...');
        try {
            const parsedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$Helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])(sessionData);
            const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
            // Create MPC-powered client
            console.log("Creating MPC-powered client...");
            const smartSessionClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
                chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                account: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNexusAccount"])({
                    accountAddress: parsedData.granter,
                    signer: mpcSigner,
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
                }),
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(bundlerUrl)
            });
            // Attach sessions module
            console.log("Attaching sessions module...");
            const usePermissionsModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSmartSessionsValidator"])({
                account: smartSessionClient.account,
                signer: mpcSigner,
                moduleData: parsedData.moduleData
            });
            const sessionEnabledClient = smartSessionClient.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionUseActions"])(usePermissionsModule));
            // Execute transaction (example: calling 'increment')
            console.log("Executing transaction...");
            const userOpHash = await sessionEnabledClient.usePermission({
                calls: [
                    {
                        to: "0x7961d826258946969fa0d80b34508094c6148bdf",
                        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                            abi: CounterAbi,
                            functionName: "increment"
                        })
                    }
                ]
            });
            setTxHash(userOpHash);
            setLoading('');
        } catch (error) {
            console.error('Execution Error:', error);
            setLoading('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl mb-8",
                children: "MPC-Powered Smart Sessions"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: initializeMPCSigner,
                        className: "btn-primary",
                        disabled: !!mpcSigner,
                        children: mpcSigner ? 'MPC Signer Ready' : 'Initialize MPC Signer'
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    mpcSigner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: createSmartSession,
                        className: "btn-secondary",
                        disabled: !!sessionData,
                        children: sessionData ? 'Session Created' : 'Create Smart Session'
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    sessionData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: executeTransaction,
                        className: "btn-success",
                        children: "Execute Transaction"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-500",
                        children: loading
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 269,
                        columnNumber: 21
                    }, this),
                    txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 bg-gray-100 rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono break-words",
                            children: [
                                "Transaction Hash: ",
                                txHash
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 space-y-2",
                        children: [
                            mpcSigner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "MPC Signer Address: ",
                                    mpcSigner.address
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 278,
                                columnNumber: 13
                            }, this),
                            sessionData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Session Granter: ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$Helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])(sessionData).granter
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s(SessionPage, "b5GwP05Km070Za39RqnUPpS1f2w=");
_c = SessionPage;
var _c;
__turbopack_refresh__.register(_c, "SessionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_41f81e._.js.map