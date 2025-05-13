"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthyRpc = getHealthyRpc;
var web3_js_1 = require("@solana/web3.js");
function getHealthyRpc(rpcs_1) {
    return __awaiter(this, arguments, void 0, function (rpcs, slotDrift) {
        var best, maxSlot, candidates, _i, rpcs_2, url, conn, start, slot, latency, e_1, _a, candidates_1, node, drift;
        if (slotDrift === void 0) { slotDrift = 20; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    best = null;
                    maxSlot = 0;
                    candidates = [];
                    _i = 0, rpcs_2 = rpcs;
                    _b.label = 1;
                case 1:
                    if (!(_i < rpcs_2.length)) return [3 /*break*/, 6];
                    url = rpcs_2[_i];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    conn = new web3_js_1.Connection(url);
                    start = Date.now();
                    return [4 /*yield*/, conn.getSlot()];
                case 3:
                    slot = _b.sent();
                    latency = Date.now() - start;
                    candidates.push({ url: url, slot: slot, latency: latency });
                    if (slot > maxSlot)
                        maxSlot = slot;
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    for (_a = 0, candidates_1 = candidates; _a < candidates_1.length; _a++) {
                        node = candidates_1[_a];
                        drift = maxSlot - node.slot;
                        if (drift <= slotDrift) {
                            if (!best || node.latency < best.latency) {
                                best = node;
                            }
                        }
                    }
                    if (!best)
                        throw new Error("No healthy RPC found.");
                    return [2 /*return*/, best.url];
            }
        });
    });
}
