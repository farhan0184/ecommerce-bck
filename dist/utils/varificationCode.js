"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = void 0;
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};
exports.generateVerificationCode = generateVerificationCode;
//# sourceMappingURL=varificationCode.js.map