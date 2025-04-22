module.exports = {

"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/lib/biconomy.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// lib/biconomy.ts
__turbopack_esm__({
    "createOwnerNexusClient": (()=>createOwnerNexusClient),
    "createSessionUsageClient": (()=>createSessionUsageClient),
    "installSmartSessionModule": (()=>installSmartSessionModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/clients/createBicoBundlerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/account/toNexusAccount.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/transports/http.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/decorators/index.js [app-rsc] (ecmascript) <locals>");
;
;
;
;
// Owner’s private key (for demo purposes, use secure storage in production)
const OWNER_PRIVATE_KEY = "YOUR_OWNER_PRIVATE_KEY"; // Replace with your private key
const ownerAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(`0x${OWNER_PRIVATE_KEY}`);
// Biconomy bundler URL (replace with your actual bundler endpoint)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/yourBundlerId";
async function createOwnerNexusClient() {
    const nexusClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
        account: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toNexusAccount"])({
            signer: ownerAccount,
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseSepolia"],
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["http"])()
        }),
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["http"])(bundlerUrl)
    });
    return nexusClient;
}
async function installSmartSessionModule(nexusClient, sessionSigner) {
    const sessionsModule = (await __turbopack_require__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/index.js [app-rsc] (ecmascript, async loader)")(__turbopack_import__)).toSmartSessionsValidator({
        account: nexusClient.account,
        signer: sessionSigner
    });
    const hash = await nexusClient.installModule({
        module: sessionsModule.moduleInitData
    });
    await nexusClient.waitForUserOperationReceipt({
        hash
    });
    const nexusSessionClient = nexusClient.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionCreateActions"])(sessionsModule));
    return {
        nexusSessionClient,
        sessionsModule
    };
}
async function createSessionUsageClient() {
    const nexusClient = await createOwnerNexusClient();
    return nexusClient;
}
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
        // Remove the "0x" prefix if present and convert to bytes.
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
    "createSilenceLabsSigner": (()=>createSilenceLabsSigner),
    "signMessageWithSilenceLabs": (()=>signMessageWithSilenceLabs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@silencelaboratories/walletprovider-sdk/dist/index.esm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/browserWallet.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
// Silence Labs cluster configuration (update if needed)
const clusterConfig = {
    walletProviderId: "WalletProvider",
    walletProviderUrl: "ws://34.118.117.249",
    apiVersion: "v1"
};
const THRESHOLD = 2;
const PARTIES_NUMBER = 3;
async function createSilenceLabsSigner() {
    const demoWalletPrivateKey = "YOUR_BROWSER_WALLET_PRIVATE_KEY"; // Replace with a demo key
    const browserWallet = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BrowserWallet"](demoWalletPrivateKey);
    const ownerAddress = "0xYourOwnerAddress";
    // Generate an ephemeral key for signing.
    const algSign = [
        "secp256k1"
    ];
    const ephemeralPrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateEphPrivateKey"])("ed25519");
    const ephemeralPublicKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEphPublicKey"])(ephemeralPrivateKey, "secp256k1");
    const ephId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    // Create an ephemeral key claim with a 1‑hour lifetime.
    const ephClaim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EphKeyClaim"](ephId, ephemeralPublicKey, "secp256k1", 60 * 60);
    // Create the EOAAuth instance using the BrowserWallet.
    const eoaAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EOAAuth"](ownerAddress, browserWallet, {
        ephClaim
    });
    // Create the wallet provider service client.
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: "WalletProvider",
        walletProviderUrl: "ws://34.118.117.249",
        apiVersion: "v1"
    });
    // Create the NetworkSigner instance.
    const networkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
    // Perform key generation without any permission arguments.
    const keygenResponse = await networkSigner.generateKey(algSign);
    console.log("Silence Labs keygen response:", keygenResponse);
    return networkSigner;
}
async function signMessageWithSilenceLabs(message) {
    const networkSigner = await createSilenceLabsSigner();
    const signReq = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(), message, "rawBytes").build();
    const algSign = [
        "secp256k1"
    ];
    const keygenResponse = await networkSigner.generateKey(algSign);
    const primaryKey = keygenResponse[0];
    const [signatureResult] = await networkSigner.signMessage(primaryKey.keyId, "secp256k1", signReq);
    return signatureResult.sign;
}
}}),
"[project]/contracts/ABI.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newCounter\",\"type\":\"uint256\"}],\"name\":\"Incremented\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"counter\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"increment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"));}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// pages/index.tsx
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/biconomy.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/sl.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contracts$2f$ABI$2e$json__$28$json$29$__ = __turbopack_import__("[project]/contracts/ABI.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function Home() {
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signature, setSignature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    // Send a transaction using the integrated Biconomy + Silence Labs session.
    const sendTransaction = async ()=>{
        setLoading(true);
        try {
            // 1. Create the owner Nexus client.
            const nexusClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOwnerNexusClient"])();
            // 2. Create a Silence Labs signer (using our EOAAuth setup).
            const silenceLabsSigner = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSilenceLabsSigner"])();
            // 3. Install the smart sessions module with the Silence Labs signer.
            const { nexusSessionClient, sessionsModule } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["installSmartSessionModule"])(nexusClient, silenceLabsSigner);
            // 4. Create a dummy session key (for demo, we generate a random account).
            const { privateKeyToAccount, generatePrivateKey } = await __turbopack_require__("[project]/node_modules/viem/_esm/accounts/index.js [app-rsc] (ecmascript, async loader)")(__turbopack_import__);
            const sessionOwner = privateKeyToAccount(`0x${generatePrivateKey().slice(2)}`);
            const sessionPublicKey = sessionOwner.address;
            const sessionRequestedInfo = [
                {
                    sessionPublicKey,
                    actionPoliciesInfo: [
                        {
                            contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
                            rules: [],
                            functionSelector: "0x"
                        }
                    ]
                }
            ];
            // 6. Grant session permission.
            const createSessionsResponse = await nexusSessionClient.grantPermission({
                sessionRequestedInfo
            });
            await nexusClient.waitForUserOperationReceipt({
                hash: createSessionsResponse.userOpHash
            });
            const sessionData = {
                granter: nexusClient.account.address,
                sessionPublicKey,
                description: `Demo session using Silence Labs signer`,
                moduleData: {
                    ...createSessionsResponse,
                    mode: "USE"
                }
            };
            const smartSessionNexusClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSessionUsageClient"])();
            // const useSmartSessionNexusClient = smartSessionNexusClient.extend(
            //   sessionsModule && sessionsModule.moduleInitData ? () => sessionsModule : () => ({})
            // );
            // 9. Prepare transaction data: call the "increment" function.
            const txData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$contracts$2f$ABI$2e$json__$28$json$29$__["default"],
                functionName: "increment"
            });
        //   const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; 
        //   const userOpHash = await useSmartSessionNexusClient.usePermission({
        //     calls: [
        //         {
        //             to: contractAddress, // Replace with your target contract address
        //             data: encodeFunctionData({
        //                 abi: IncrementerABI,
        //                 functionName: "incrementNumber"
        //             })
        //         }
        //     ]
        // });
        // setTxHash(userOpHash);
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
        setLoading(false);
    };
    const signDemoMessage = async ()=>{
        setLoading(true);
        try {
            const demoMessage = "Hello from Silence Labs!";
            const sig = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signMessageWithSilenceLabs"])(demoMessage);
            setSignature(sig);
        } catch (error) {
            console.error("Error signing message:", error);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "2rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Next.js Demo: Biconomy & Silence Labs Integration"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: sendTransaction,
                disabled: loading,
                children: loading ? "Processing Transaction..." : "Send Increment Transaction"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Transaction submitted! UserOp hash: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: txHash
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 112,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: signDemoMessage,
                disabled: loading,
                children: loading ? "Signing..." : "Sign Demo Message"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            signature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Message Signature: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: signature
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 121,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 105,
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__b5308d._.js.map