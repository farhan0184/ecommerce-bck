"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validators_1 = require("../../validators/user.validators");
const auth_controlers_1 = require("../../controllers/auth.controlers");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/register", user_validators_1.validateUserRegister, auth_controlers_1.createUser);
exports.default = userRoutes;
//# sourceMappingURL=user.routers.js.map