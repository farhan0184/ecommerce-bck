"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validators_1 = require("../../validators/user.validators");
const auth_controlers_1 = require("../../controllers/auth.controlers");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/register", user_validators_1.validateUserRegister, auth_controlers_1.register);
userRoutes.post("/send-otp", user_validators_1.validateSendOtp, auth_controlers_1.sendOtp);
userRoutes.post("/login", user_validators_1.validateUserLogin, auth_controlers_1.login);
userRoutes.post("/forgot-password", user_validators_1.validateForgotPassword, auth_controlers_1.forgotPassword);
userRoutes.post("/reset-password", user_validators_1.validateResetPassword, auth_controlers_1.resetPassword);
userRoutes.get("/list", auth_controlers_1.getAllUsers);
exports.default = userRoutes;
//# sourceMappingURL=user.routers.js.map