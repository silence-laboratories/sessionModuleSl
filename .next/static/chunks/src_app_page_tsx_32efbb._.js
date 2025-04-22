(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_page_tsx_32efbb._.js", {

"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SessionPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/account/toNexusAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/clients/createBicoBundlerClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$validators$2f$smartSessions$2f$toSmartSessionsModule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/validators/smartSessions/toSmartSessionsModule.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$validators$2f$smartSessions$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@biconomy/abstractjs/dist/_esm/modules/validators/smartSessions/decorators/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$rhinestone$2f$module$2d$sdk$2f$_esm$2f$module$2f$smart$2d$sessions$2f$policies$2f$sudo$2d$policy$2f$installation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@rhinestone/module-sdk/_esm/module/smart-sessions/policies/sudo-policy/installation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const chain = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"],
    id: 84532
};
const ALCHEMY_RPC = "https://base-sepolia.g.alchemy.com/v2/71BtTS_ke_J_XJg8P2LtjAGZuDKOQUJD";
const BICONOMY_BUNDLER_URL = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const OWNER_PRIVATE_KEY = "0x1439f4ea306e7a2ed953a1f7e948614c2b3a8d62ae034b50d9b4ba3f51124c03";
function SessionPage() {
    _s();
    const [mpcSigner, setMpcSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionData, setSessionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [keyConfig, setKeyConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const createSmartSession = async ()=>{
        setLoading("Creating Smart Session...");
        try {
            const owner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(OWNER_PRIVATE_KEY);
            const nexusAccount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$account$2f$toNexusAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toNexusAccount"])({
                signer: owner,
                chain,
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(ALCHEMY_RPC)
            });
            const nexusClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$clients$2f$createBicoBundlerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSmartAccountClient"])({
                account: nexusAccount,
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(BICONOMY_BUNDLER_URL)
            });
            const smartModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$validators$2f$smartSessions$2f$toSmartSessionsModule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSmartSessionsModule"])({
                signer: owner
            });
            const installHash = await nexusClient.installModule({
                module: smartModule
            });
            const receipt = await nexusClient.waitForUserOperationReceipt({
                hash: installHash
            });
            if (!receipt.success) throw new Error("Module installation failed");
            const smartSessionsClient = nexusClient.extend((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$biconomy$2f$abstractjs$2f$dist$2f$_esm$2f$modules$2f$validators$2f$smartSessions$2f$decorators$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["smartSessionActions"])());
            const session = await smartSessionsClient.grantPermission({
                redeemer: mpcSigner.address,
                actions: [
                    {
                        actionTarget: "0x7961d826258946969fa0d80b34508094c6148bdf",
                        actionTargetSelector: "0xa9059cbb",
                        actionPolicies: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$rhinestone$2f$module$2d$sdk$2f$_esm$2f$module$2f$smart$2d$sessions$2f$policies$2f$sudo$2d$policy$2f$installation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSudoPolicy"])()
                        ]
                    }
                ]
            });
            // Stringify with custom replacer for BigInt handling
            setSessionData(JSON.stringify(session, (_, v)=>typeof v === 'bigint' ? v.toString() : v));
            setLoading("");
        } catch (err) {
            console.error("Session Creation Error:", err);
            setLoading("");
        }
    };
    const sendMessageToEliza = async ()=>{
        if (!chatInput) return;
        setLoading("Sending to Eliza...");
        try {
            const agentId = "aa0d6f50-b80b-0dfa-811b-1f8750ee6278";
            const regex = /(\d+(\.\d+)?)\s*(ETH|eth|token)?\s*to\s*(0x[a-fA-F0-9]{40})/;
            const match = chatInput.match(regex);
            if (!match) throw new Error("Invalid command format");
            const amount = match[1];
            const recipient = match[4];
            // Validate and reformat the ephemeralPrivateKey in keyConfig:
            if (!keyConfig?.ephemeralPrivateKey) throw new Error("Missing ephemeralPrivateKey in keyConfig");
            const rawEphemeralKey = keyConfig.ephemeralPrivateKey;
            // If the key is a Buffer (or similar), convert to hex string; if already a string, ensure '0x' prefix.
            const formattedEphemeralKey = typeof rawEphemeralKey === "string" ? rawEphemeralKey.startsWith("0x") ? rawEphemeralKey : "0x" + rawEphemeralKey : rawEphemeralKey.toString("hex").startsWith("0x") ? rawEphemeralKey.toString("hex") : "0x" + rawEphemeralKey.toString("hex");
            const payload = {
                recipient,
                amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(amount).toString(),
                sessionInfo: {
                    ...JSON.parse(sessionData || "{}")
                },
                keyConfig: {
                    ...keyConfig,
                    ephemeralPrivateKey: formattedEphemeralKey
                }
            };
            const finalMessage = `
  Execute transaction of ${amount} token to ${recipient}
  
  \`\`\`json
  ${JSON.stringify(payload, null, 2)}
  \`\`\`
      `;
            const formData = new FormData();
            formData.append("text", finalMessage);
            formData.append("user", "user");
            const response = await fetch(`http://localhost:3000/${agentId}/message`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            setChatHistory([
                ...chatHistory,
                `You: ${chatInput}`,
                `Eliza: ${data?.response}`
            ]);
            setChatInput("");
            setLoading("");
        } catch (err) {
            console.error(err);
            setChatHistory([
                ...chatHistory,
                `Error: ${err.message}`
            ]);
            setLoading("");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-8 flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/2 space-y-4 max-w-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-6",
                        children: "Session Generator"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: initializeMPCSigner,
                        className: "btn-primary",
                        disabled: !!mpcSigner,
                        children: mpcSigner ? "MPC Signer Ready" : "Initialize MPC Signer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    mpcSigner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: createSmartSession,
                        className: "btn-secondary",
                        disabled: !!sessionData,
                        children: sessionData ? "Session Created" : "Create Smart Session"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-500",
                        children: loading
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            sessionData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/2 pl-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "💬 Chat with Eliza OS"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 mb-4 h-80 overflow-y-auto border p-2 rounded",
                        children: chatHistory.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-gray-100 rounded",
                                children: msg
                            }, idx, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 154,
                                columnNumber: 45
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Type your command...",
                        value: chatInput,
                        onChange: (e)=>setChatInput(e.target.value),
                        className: "p-2 border w-full mb-2 rounded"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: sendMessageToEliza,
                        className: "btn-primary",
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(SessionPage, "y+RmUEzTLwb2I9AQ6eUAMOi+Q1U=");
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

//# sourceMappingURL=src_app_page_tsx_32efbb._.js.map