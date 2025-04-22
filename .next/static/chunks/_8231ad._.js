(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_8231ad._.js", {

"[project]/lib/browserWallet.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// lib/browserWallet.ts
__turbopack_esm__({
    "BrowserWallet": (()=>BrowserWallet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashTypedData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@noble/curves/esm/secp256k1.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/serializeSignature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
class BrowserWallet {
    privateKey;
    constructor(privateKeyHex){
        this.privateKey = Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(privateKeyHex.replace(/^0x/, ''), 'hex'));
    }
    async signTypedData(from, request) {
        const castedRequest = {
            ...request,
            message: request.message
        };
        // Create a hash of the typed data.
        const messageHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashTypedData"])(castedRequest);
        const messageBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(messageHash);
        // Sign the hash.
        const signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$curves$2f$esm$2f$secp256k1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secp256k1"].sign(messageBytes, this.privateKey);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])({
            r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(signature.r),
            s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(signature.s),
            v: BigInt(signature.recovery) + BigInt(27)
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/sl.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// lib/silenceLabs.ts
__turbopack_esm__({
    "createSilenceLabsSigner": (()=>createSilenceLabsSigner),
    "createViemAccount": (()=>createViemAccount)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@silencelaboratories/walletprovider-sdk/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/browserWallet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/toAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/serializeSignature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/transaction/serializeTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/signature/hashTypedData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/js-base64/base64.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
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
    const demoWalletPrivateKey = "0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393";
    const browserWallet = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browserWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserWallet"](demoWalletPrivateKey);
    const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393");
    const ownerAddress = account.address;
    // Generate an ephemeral key for signing
    const algSign = "secp256k1"; // Changed to string for ephemeral key generation
    const ephemeralPrivateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateEphPrivateKey"])(algSign);
    const ephemeralPublicKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEphPublicKey"])(ephemeralPrivateKey, algSign);
    const ephId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const ephClaim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EphKeyClaim"](ephId, ephemeralPublicKey, algSign, 60 * 60);
    // Create the EOAAuth instance using the BrowserWallet
    const eoaAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOAAuth"](ownerAddress, browserWallet, {
        ephClaim
    });
    // Create the wallet provider service client
    const walletProviderClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProviderServiceClient"]({
        walletProviderId: "WalletProvider",
        walletProviderUrl: "ws://34.118.117.249",
        apiVersion: "v1"
    });
    // Create the NetworkSigner instance
    const networkSigner = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkSigner"](walletProviderClient, THRESHOLD, PARTIES_NUMBER, eoaAuth);
    const signAlg = "secp256k1";
    // Perform key generation without permission arguments
    const keygenResponse = await networkSigner.generateKey([
        signAlg
    ]); // Changed to remove algSign
    console.log("Silence Labs keygen response:", keygenResponse);
    return {
        networkSigner,
        keygenResponse
    };
}
function createViemAccount(networkSigner, keyId, publicKey, signAlg = 'secp256k1') {
    const publicKeyHex = `0x${publicKey}`; // Ensure proper hex format
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyToAddress"])(publicKeyHex);
    console.log("Generated MPC Address:", address); // Debug log
    console.log("Address:", address);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$toAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toAccount"])({
        address,
        keyId,
        async signMessage ({ message }) {
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(message), 'EIP191').build();
            console.log("Sign Request signMessage", signRequest);
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            console.log("Sign:", sign);
            if (sign) {
                const signature = formatViemSign(sign);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])(signature);
            }
            throw new Error('No signature returned from network');
        },
        async signTransaction (transaction, args) {
            console.log("Sign Transaction", transaction);
            const serializer = args?.serializer || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$transaction$2f$serializeTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeTransaction"];
            const signableTransaction = (()=>{
                // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
                // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
                if (transaction.type === 'eip4844') {
                    return {
                        ...transaction,
                        sidecars: false
                    };
                }
                return transaction;
            })();
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])(serializer(signableTransaction)), 'EIP191').build();
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            if (sign) {
                const signature = formatViemSign(sign);
                return serializer(transaction, signature);
            }
            throw new Error('No signature returned from network');
        },
        async signTypedData (typedData) {
            console.log("Sign Typed Data", typedData);
            const signRequest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$silencelaboratories$2f$walletprovider$2d$sdk$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignRequestBuilder"]().setRequest(address, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$hashTypedData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashTypedData"])(typedData), 'EIP712').build();
            const sign = (await networkSigner.signMessage(keyId, signAlg, signRequest))[0];
            if (sign) {
                const signature = formatViemSign(sign);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$serializeSignature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeSignature"])(signature);
            }
            throw new Error('No signature returned from network');
        }
    });
}
function formatViemSign(signResp) {
    const signb64 = signResp.sign;
    const sign = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Base64"].decode(signb64);
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(sign.slice(0, 32));
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(sign.slice(32, 64));
    const recid = signResp.recid;
    const signature = {
        r,
        s,
        v: recid === 0 ? BigInt(27) : BigInt(28),
        yParity: recid
    };
    return signature;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/biconomy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createOwnerClient": (()=>createOwnerClient),
    "createSessionClient": (()=>createSessionClient),
    "setupMPCSession": (()=>setupMPCSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/sl.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/clients/createBicoBundlerClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/account/toNexusAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/chains/definitions/sepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/toSmartSessionsValidator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/smartSessionsValidator/decorators/index.js [app-client] (ecmascript) <locals>");
;
;
;
;
;
const COUNTER_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const BUNDLER_URL = "https://paymaster.biconomy.io/api/v1/11155111/J51Gd5gX3.fca10d8b-6619-4ed3-a580-3ce21fc0d717";
async function createOwnerClient() {
    const ownerAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])("0x6b17d0ae446c070ce14b12990cc10f5fcf89d3410277abea6f00352535502393");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
        account: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNexusAccount"])({
            signer: ownerAccount,
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sepolia"],
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
        }),
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(BUNDLER_URL)
    });
}
async function setupMPCSession(ownerClient) {
    const { networkSigner, keygenResponse } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSilenceLabsSigner"])();
    if (!keygenResponse?.[0]) throw new Error("Invalid MPC key response");
    const mpcAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createViemAccount"])(networkSigner, keygenResponse[0].keyId, keygenResponse[0].publicKey, 'secp256k1');
    const sessionsModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSmartSessionsValidator"])({
        account: ownerClient.account,
        signer: ownerClient.account.signer
    });
    const installHash = await ownerClient.installModule({
        module: sessionsModule.moduleInitData
    });
    await ownerClient.waitForUserOperationReceipt({
        hash: installHash
    });
    const extendedClient = ownerClient.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionCreateActions"])(sessionsModule));
    return {
        extendedClient,
        mpcAccount,
        networkSigner,
        keygenResponse
    };
}
async function createSessionClient(sessionData) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
        account: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNexusAccount"])({
            signer: sessionData.mpcAccount,
            chain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sepolia"],
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])()
        }),
        transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(BUNDLER_URL)
    });
    const useModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$toSmartSessionsValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSmartSessionsValidator"])({
        account: client.account,
        signer: sessionData.mpcAccount
    });
    return client.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$smartSessionsValidator$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionUseActions"])(useModule));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contracts/ABI.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newCounter\",\"type\":\"uint256\"}],\"name\":\"Incremented\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"counter\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"increment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"));}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/biconomy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contracts$2f$ABI$2e$json__$28$json$29$__ = __turbopack_import__("[project]/contracts/ABI.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/abi/encodeFunctionData.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
function Home() {
    _s();
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [sessionData, setSessionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const initializeSession = async ()=>{
        setLoading(true);
        try {
            setStep(1);
            const ownerClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOwnerClient"])();
            setStep(2);
            const { extendedClient, mpcAccount, keygenResponse } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupMPCSession"])(ownerClient);
            setStep(3);
            const functionSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$contracts$2f$ABI$2e$json__$28$json$29$__["default"],
                functionName: "increment"
            }).slice(0, 10);
            setStep(4);
            const createSessionsResponse = await extendedClient.grantPermission({
                sessionRequestedInfo: [
                    {
                        sessionPublicKey: mpcAccount.address,
                        actionPoliciesInfo: [
                            {
                                contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
                                functionSelector,
                                rules: [
                                    {
                                        value: 100,
                                        offset: 0,
                                        condition: 0
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            await ownerClient.waitForUserOperationReceipt({
                hash: createSessionsResponse.userOpHash
            });
            const sessionInfo = {
                granter: ownerClient.account.address,
                sessionPublicKey: mpcAccount.address,
                description: `Permission to increment counter for ${ownerClient.account.address.slice(0, 6)}`,
                moduleData: {
                    permissionIds: createSessionsResponse.permissionIds,
                    validUntil: Math.floor(Date.now() / 1000) + 3600,
                    mode: SmartSessionMode.USE
                },
                mpcAccount,
                networkSigner: keygenResponse[0]
            };
            localStorage.setItem('mpcSession', stringify(sessionInfo));
            setSessionData(sessionInfo);
            setStep(5);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Initialization failed");
        } finally{
            setLoading(false);
        }
    };
    const sendIncrementTx = async ()=>{
        if (!sessionData) return;
        setLoading(true);
        try {
            setStep(5);
            const sessionClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$biconomy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSessionClient"])(sessionData);
            setStep(6);
            const userOpHash = await sessionClient.usePermission({
                calls: [
                    {
                        to: "0xd9145CCE52D386f254917e481eB44e9943F39138",
                        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeFunctionData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeFunctionData"])({
                            abi: __TURBOPACK__imported__module__$5b$project$5d2f$contracts$2f$ABI$2e$json__$28$json$29$__["default"],
                            functionName: "increment"
                        })
                    }
                ]
            });
            setTxHash(userOpHash);
            setStep(7);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Transaction failed");
        } finally{
            setLoading(false);
        }
    };
// ... (keep the rest of the UI code unchanged)
}
_s(Home, "a8gXtnGq7aZ5N34uZypjXuNSkg8=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_8231ad._.js.map