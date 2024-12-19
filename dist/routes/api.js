"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routers_1 = __importDefault(require("./api/user.routers"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.use('/user', user_routers_1.default);
exports.default = apiRoutes;
//# sourceMappingURL=api.js.map