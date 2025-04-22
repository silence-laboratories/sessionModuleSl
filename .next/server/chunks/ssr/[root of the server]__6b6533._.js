module.exports = {

"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[project]/lib/browserWallet.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// lib/browserWallet.ts
__turbopack_esm__({
    "BrowserWallet": (()=>BrowserWallet)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_import__("[externals]/buffer [external] (buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashTypedData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toBytes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@noble/curves/esm/secp256k1.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/serializeSignature.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toHex.js [app-rsc] (ecmascript)");
;
;
;
;
class BrowserWallet {
    privateKey;
    constructor(privateKeyHex){
        this.privateKey = Uint8Array.from(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(privateKeyHex.replace(/^0x/, ''), 'hex'));
    }
    async signTypedData(from, request) {
        const castedRequest = {
            ...request,
            message: request.message
        };
        // Create a hash of the typed data.
        const messageHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashTypedData"])(castedRequest);
        const messageBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hexToBytes"])(messageHash);
        // Sign the hash.
        const signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["secp256k1"].sign(messageBytes, this.privateKey);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeSignature"])({
            r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toHex"])(signature.r),
            s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toHex"])(signature.s),
            v: BigInt(signature.recovery) + BigInt(27)
        });
    }
}
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/lib/sl.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// lib/silenceLabs.ts
__turbopack_esm__({
    "createSignerForSign": (()=>createSignerForSign),
    "createViemAccount": (()=>createViemAccount),
    "generateCryptographicKey": (()=>generateCryptographicKey),
    "loadKeyConfig": (()=>loadKeyConfig),
    "saveKeyConfig": (()=>saveKeyConfig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@silencelaboratories/walletprovider-sdk/dist/index.esm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/browserWallet.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/toAccount.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toHex.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/serializeSignature.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/transaction/serializeTransaction.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/hash/keccak256.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashTypedData.js [app-rsc] (ecmascript)");
;
;
;
;
;
// Cluster configuration
const clusterConfig = {
    walletProviderId: "WalletProvider",
    walletProviderUrl: "ws://34.118.117.249",
    apiVersion: "v1"
};
const THRESHOLD = 2;
const PARTIES_NUMBER = 3;
const saveKeyConfig = (config)=>{
    localStorage.setItem("keyConfig", JSON.stringify(config));
};
const loadKeyConfig = ()=>{
    const raw = localStorage.getItem("keyConfig");
    return raw ? JSON.parse(raw) : null;
};
// Utility: convert hex string to Uint8Array
function hexToBytes(hexString) {
    if (hexString.startsWith("0x")) hexString = hexString.slice(2);
    const bytes = new Uint8Array(hexString.length / 2);
    for(let i = 0; i < bytes.length; i++){
        bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return bytes;
}
async function generateCryptographicKey() {
    // Use a demo wallet private key (in production, obtain securely)
    const demoWalletPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
    const browserWallet = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BrowserWallet"](demoWalletPrivateKey);
    const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(demoWalletPrivateKey);
    const ownerAddress = account.address;
    // Generate an ephemeral key for later signing
    const algSign = "secp256k1";
    const ephemeralPrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateEphPrivateKey"])(algSign);
    const ephemeralPublicKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEphPublicKey"])(ephemeralPrivateKey, algSign);
    const ephId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const ephClaim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EphKeyClaim"](ephId, ephemeralPublicKey, algSign, 60 * 60);
    // Create the EOAAuth instance for key generation using the EOA (BrowserWallet)
    const eoaAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EOAAuth"](ownerAddress, browserWallet, {
        ephClaim
    });
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: clusterConfig.walletProviderId,
        walletProviderUrl: clusterConfig.walletProviderUrl,
        apiVersion: "v1"
    });
    // Create network signer (using EOAAuth) to call generateKey
    const eoaNetworkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
    const signAlg = "secp256k1";
    const keygenResponse = await eoaNetworkSigner.generateKey([
        signAlg
    ]);
    const [primaryKey] = keygenResponse;
    primaryKey.keyId = String(primaryKey.keyId);
    console.log("Silence Labs keygen response:", keygenResponse);
    // Build key configuration object
    const keyConfig = {
        publicKey: primaryKey.publicKey,
        keyId: primaryKey.keyId,
        ephemeralKeyId: ephId,
        ephemeralPrivateKey: Buffer.from(ephemeralPrivateKey).toString("hex"),
        signerAddress: ownerAddress,
        t: THRESHOLD,
        n: PARTIES_NUMBER,
        sessionAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeAddress"])(primaryKey.publicKey)
    };
    // Store configuration in browser storage
    saveKeyConfig(keyConfig);
    return {
        keyConfig,
        eoaNetworkSigner
    };
}
async function createSignerForSign() {
    const config = loadKeyConfig();
    if (!config) {
        throw new Error("Key configuration not found. Please generate keys first.");
    }
    const ephemeralPrivateKeyBytes = hexToBytes(config.ephemeralPrivateKey);
    const ephAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EphAuth"](config.ephemeralKeyId, ephemeralPrivateKeyBytes, "secp256k1");
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: clusterConfig.walletProviderId,
        walletProviderUrl: clusterConfig.walletProviderUrl,
        apiVersion: "v1"
    });
    const networkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, config.t, config.n, ephAuth);
    return {
        networkSigner,
        keyId: config.keyId,
        publicKey: config.publicKey
    };
}
function createViemAccount(networkSigner, keyId, publicKey, signAlg = 'secp256k1') {
    const publicKeyHex = `0x${publicKey}`;
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["publicKeyToAddress"])(publicKeyHex);
    console.log("Generated MPC Address:", address);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toAccount"])({
        address,
        keyId,
        async signMessage ({ message }) {
            console.log("signMessage", message);
            message = (()=>{
                if (typeof message === "string") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringToHex"])(message);
                }
                if (typeof message.raw === "string") {
                    return message.raw;
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bytesToHex"])(message.raw);
            })();
            if (message.slice(0, 2) === "0x") {
                message = message.slice(2);
            }
            console.log("Processed message:", message);
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(), message, "rawBytes").build();
            console.log("Sign Request:", signRequest);
            console.log("Using network signer:", networkSigner);
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            console.log("Signature response:", sign);
            if (sign) {
                const signature = formatViemSign(sign);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeSignature"])(signature);
            }
            throw new Error('No signature returned from network');
        },
        async signTransaction (transaction, args) {
            console.log("Sign Transaction", transaction);
            const serializer = args?.serializer || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeTransaction"];
            const signableTransaction = (()=>{
                if (transaction.type === 'eip4844') {
                    return {
                        ...transaction,
                        sidecars: false
                    };
                }
                return transaction;
            })();
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["keccak256"])(serializer(signableTransaction)), 'EIP191').build();
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            if (sign) {
                const signature = formatViemSign(sign);
                return serializer(transaction, signature);
            }
            throw new Error('No signature returned from network');
        },
        async signTypedData (typedData) {
            console.log("Sign Typed Data", typedData);
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashTypedData"])(typedData), 'EIP712').build();
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            if (sign) {
                const signature = formatViemSign(sign);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeSignature"])(signature);
            }
            throw new Error('No signature returned from network');
        }
    });
}
function formatViemSign(signResp) {
    const sign = signResp.sign;
    const hexSig = sign.startsWith("0x") ? sign.slice(2) : sign;
    const r = "0x" + hexSig.slice(0, 64); // first 64 hex characters = 32 bytes
    const s = "0x" + hexSig.slice(64, 128); // next 64 hex characters = 32 bytes
    const recid = signResp.recid;
    const signature = {
        r,
        s,
        v: recid === 0 ? BigInt(27) : BigInt(28),
        yParity: recid
    };
    return signature;
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// // app/page.tsx
// "use client";
// import { useState } from 'react';
// import {
//   createSmartAccountClient,
//   toNexusAccount,
//   smartSessionCreateActions,
//   toSmartSessionsValidator,
//   smartSessionUseActions,
//   stringify,
//   parse,
//   SmartSessionMode,
//   CreateSessionDataParams,
// } from "@biconomy/abstractjs";
// import { baseSepolia } from "viem/chains";
// import { http, encodeFunctionData } from "viem";
// import { createViemAccount, generateCryptographicKey, createSignerForSign } from '../../lib/sl';
// import abi from './../../contracts/ABI.json';
// import { privateKeyToAccount } from 'viem/accounts';
// import { ethers } from 'ethers';
// export default function SessionPage() {
//   const [mpcSigner, setMpcSigner] = useState<any>(null);
//   const [sessionData, setSessionData] = useState<string | null>(null);
//   const [loading, setLoading] = useState<string>('');
//   const [txHash, setTxHash] = useState<string>('');
//   // Initialize MPC Signer: generate keys (if needed) and then create the signer for signing
//   const initializeMPCSigner = async () => {
//     setLoading('Initializing MPC signer...');
//     try {
//       // Generate key pair (this will store config in localStorage)
//       await generateCryptographicKey();
//       // Create a NetworkSigner using EphAuth for signing operations
//       const { networkSigner, keyId, publicKey } = await createSignerForSign();
//       const mpcAccount = createViemAccount(networkSigner, keyId, publicKey);
//       setMpcSigner(mpcAccount);
//       setLoading('');
//     } catch (error) {
//       console.error('MPC Signer Error:', error);
//       setLoading('');
//     }
//   };
//   // Create Biconomy Smart Session
//   const createSmartSession = async () => {
//     if (!mpcSigner) return;
//     setLoading('Creating smart session...');
//     try {
//       // Initialize Nexus client with owner account
//       const ownerPrivateKey = "0xec2387b319f9c96c5f2a3f9f5152208d09c0265d139235cab9c90511e6836fc7"; // Replace with actual owner key
//       const ownerAccount = privateKeyToAccount(ownerPrivateKey);
//       const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
//       const ownerAccountAddress = ownerAccount.address;
//       console.log("Owner Account:", ownerAccountAddress);
//       const nexusClient = await createSmartAccountClient({
//         account: await toNexusAccount({
//           signer: ownerAccount,
//           chain: baseSepolia,
//           transport: http(),
//         }),
//         transport: http(bundlerUrl),
//       });
//       console.log("Nexus Client:", nexusClient.account.address);
//       // Create and install sessions module
//       const sessionsModule = toSmartSessionsValidator({
//         account: nexusClient.account,
//         signer: ownerAccount
//       });
//       console.log("Sessions Module:", sessionsModule.moduleInitData);
//       const hash = await nexusClient.installModule({
//         module: sessionsModule.moduleInitData
//       });
//       console.log("Module Installation Hash:", hash);
//       await nexusClient.waitForUserOperationReceipt({ hash });
//       const nexusSessionClient = nexusClient.extend(smartSessionCreateActions(sessionsModule));
//       // Create session with MPC public key
//       const sessionRequestedInfo: CreateSessionDataParams[] = [
//         {
//           sessionKeyData: mpcSigner.address as `0x${string}`,
//           actionPoliciesInfo: [{
//             contractAddress: "0x7961d826258946969fa0d80b34508094c6148bdf" as `0x${string}`,
//             rules: [],
//             functionSelector: "0xd09de08a" as `0x${string}` // Function selector for 'increment'
//           }]
//         }
//       ];
//       console.log("sessionRequestedInfo:", sessionRequestedInfo);
//       const createSessionsResponse = await nexusSessionClient.grantPermission({
//         sessionRequestedInfo
//       });
//       await nexusClient.waitForUserOperationReceipt({
//         hash: createSessionsResponse.userOpHash
//       });
//       // Store session data in localStorage for persistence
//       const sessionDataObj = {
//         granter: nexusClient.account.address,
//         sessionPublicKey: mpcSigner.address,
//         description: `MPC Session for ${nexusClient.account.address.slice(0, 6)}`,
//         moduleData: {
//           ...createSessionsResponse,
//           mode: SmartSessionMode.USE
//         }
//       };
//       const compressedData = stringify(sessionDataObj);
//       localStorage.setItem('mpcSessionData', compressedData);
//       setSessionData(compressedData);
//       setLoading('');
//     } catch (error) {
//       console.error('Session Creation Error:', error);
//       setLoading('');
//     }
//   };
//   // Execute Transaction with MPC Session
//   const executeTransaction = async () => {
//     if (!sessionData) return;
//     setLoading('Executing transaction...');
//     try {
//       const parsedData = parse(sessionData);
//       const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
//       // Create MPC-powered client
//       console.log("Creating MPC-powered client...");
//       const smartSessionClient = createSmartAccountClient({
//         chain: baseSepolia,
//         account: await toNexusAccount({
//           signer: mpcSigner,
//           chain: baseSepolia,
//           transport: http(),
//         }),
//         transport: http(bundlerUrl)
//       });
//       // Attach sessions module
//       console.log("Attaching sessions module...");
//       const usePermissionsModule = toSmartSessionsValidator({
//         account: smartSessionClient.account,
//         signer: mpcSigner,
//         moduleData: parsedData.moduleData
//       });
//       const sessionEnabledClient = smartSessionClient.extend(
//         smartSessionUseActions(usePermissionsModule)
//       );
//       // Execute transaction (example: calling 'increment')
//       console.log("Executing transaction...");
//       const userOpHash = await sessionEnabledClient.usePermission({
//         calls: [{
//           to: "0x7961d826258946969fa0d80b34508094c6148bdf",
//           data: encodeFunctionData({
//             abi: abi,
//             functionName: "increment"
//           })
//         }],
//         callGasLimit: BigInt(100000),
//         verificationGasLimit: BigInt(500000),
//         preVerificationGas: BigInt(300000)
//       });
//       setTxHash(userOpHash);
//       setLoading('');
//     } catch (error) {
//       console.error('Execution Error:', error);
//       setLoading('');
//     }
//   };
//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl mb-8">MPC-Powered Smart Sessions</h1>
//       <div className="space-y-4 max-w-2xl">
//         <button
//           onClick={initializeMPCSigner}
//           className="btn-primary"
//           disabled={!!mpcSigner}
//         >
//           {mpcSigner ? 'MPC Signer Ready' : 'Initialize MPC Signer'}
//         </button>
//         {mpcSigner && (
//           <button
//             onClick={createSmartSession}
//             className="btn-secondary"
//             disabled={!!sessionData}
//           >
//             {sessionData ? 'Session Created' : 'Create Smart Session'}
//           </button>
//         )}
//         {sessionData && (
//           <button
//             onClick={executeTransaction}
//             className="btn-success"
//           >
//             Execute Transaction
//           </button>
//         )}
//         {loading && <p className="text-blue-500">{loading}</p>}
//         {txHash && (
//           <div className="mt-4 p-4 bg-gray-100 rounded">
//             <p className="font-mono break-words">Transaction Hash: {txHash}</p>
//           </div>
//         )}
//         <div className="mt-8 space-y-2">
//           {mpcSigner && (
//             <p>MPC Signer Address: {mpcSigner.address}</p>
//           )}
//           {sessionData && (
//             <p>Session Granter: {parse(sessionData).granter}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
__turbopack_esm__({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/sl.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/createWalletClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/transports/http.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-rsc] (ecmascript)");
;
;
;
;
;
// 1. Replace with your actual contract ABI and address
const CounterAbi = [
    {
        inputs: [],
        name: "incrementNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
const CONTRACT_ADDRESS = "0x7961d826258946969fa0d80b34508094c6148bdf"; // REPLACE WITH YOUR DEPLOYED CONTRACT ADDRESS
function HomePage() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mpcAddress, setMpcAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const initializeMPCAccount = async ()=>{
        try {
            setLoading(true);
            // Generate MPC account using Silence Labs
            const { keyConfig } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCryptographicKey"])();
            setMpcAddress(keyConfig.sessionAddress);
            // In production: Implement logic to fund the MPC address here
            console.log("Fund this MPC address:", keyConfig.sessionAddress);
        } finally{
            setLoading(false);
        }
    };
    const sendTransaction = async ()=>{
        if (!mpcAddress) return;
        try {
            setLoading(true);
            // 2. Create signer and Viem account
            const { networkSigner, keyId, publicKey } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSignerForSign"])();
            const mpcAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createViemAccount"])(networkSigner, keyId, publicKey);
            // 3. Create wallet client with MPC account
            const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWalletClient"])({
                account: mpcAccount,
                chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseSepolia"],
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["http"])()
            });
            // 4. Create public client for network interactions
            const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPublicClient"])({
                chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseSepolia"],
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["http"])()
            });
            // 5. Send transaction directly
            const hash = await walletClient.sendTransaction({
                account: mpcAccount,
                to: CONTRACT_ADDRESS,
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                    abi: CounterAbi,
                    functionName: "incrementNumber"
                }),
                gas: BigInt(100000) // Adjust based on contract requirements
            });
            setTxHash(hash);
            // Wait for confirmation
            const receipt = await publicClient.waitForTransactionReceipt({
                hash
            });
            console.log("Transaction confirmed:", receipt);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "MPC Transaction Demo"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this),
            !mpcAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: initializeMPCAccount,
                disabled: loading,
                children: loading ? "Initializing..." : "Initialize MPC Account"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this),
            mpcAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "MPC Address: ",
                            mpcAddress
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "⚠️ Fund this address with Base Sepolia ETH ⚠️"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: sendTransaction,
                        disabled: loading,
                        children: loading ? "Sending..." : "Send Increment Transaction"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 326,
                columnNumber: 9
            }, this),
            txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Transaction Successful!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Hash: ",
                            txHash
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `https://sepolia.basescan.org/tx/${txHash}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "View on Explorer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 337,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 316,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__6b6533._.js.map