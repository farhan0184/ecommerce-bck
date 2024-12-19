"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(auth_middleware_1.decodeToken);
app.use(express_1.default.json());
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config_1.default.cors.origin);
    res.header("Access-Control-Allow-Headers", config_1.default.cors.headers);
    res.header("Access-Control-Allow-Methods", config_1.default.cors.methods);
    next();
});
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'hello world',
    });
});
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Route/Method not found',
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map