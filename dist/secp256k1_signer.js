"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secp256k1SignerFrom = void 0;
const common_scripts_1 = require("@ckb-lumos/common-scripts");
const helpers_1 = require("@ckb-lumos/helpers");
const hd_1 = require("@ckb-lumos/hd");
function secp256k1SignerFrom(PRIVATE_KEY) {
    return (transaction, accountLock) => {
        var _a;
        transaction = common_scripts_1.secp256k1Blake160.prepareSigningEntries(transaction);
        const message = (_a = transaction.get("signingEntries").get(0)) === null || _a === void 0 ? void 0 : _a.message;
        const Sig = hd_1.key.signRecoverable(message, PRIVATE_KEY);
        const tx = (0, helpers_1.sealTransaction)(transaction, [Sig]);
        return Promise.resolve(tx);
    };
}
exports.secp256k1SignerFrom = secp256k1SignerFrom;