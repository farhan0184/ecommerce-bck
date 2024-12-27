"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.jwt.secret;
const decodeToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        res.locals.user = jsonwebtoken_1.default.verify(token, secret);
        next();
        return;
    }
    catch (err) {
        next();
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=auth.middleware.js.map