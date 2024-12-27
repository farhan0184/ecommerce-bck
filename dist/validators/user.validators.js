"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.validateForgotPassword = exports.validateSendOtp = exports.validateUserLogin = exports.validateUserRegister = exports.loginSchema = void 0;
const zod_1 = require("zod");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const registerUserSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(255, { message: "Name should be at last 255 character" }),
    email: zod_1.z
        .string()
        .email({ message: "This is a email field" })
        .optional(),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(4, { message: "Password should be  min 4 character" })
        .max(255, { message: "Password should be at max 255 character" }),
    role: zod_1.z.enum(["user", "vendor", 'employee']).optional(),
    phone: zod_1.z
        .string()
        .optional(),
    otp: zod_1.z.string().length(6, { message: "OTP must be 6 digits" }),
}).refine((data) => (!!data.email || !!data.phone), {
    message: "Phone or email should be required",
    path: ["email", "phone"]
});
const validateUserRegister = (0, validate_middleware_1.default)(registerUserSchema);
exports.validateUserRegister = validateUserRegister;
// Zod validation for login input
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(), // Email is optional but must be a valid email if provided
    phone: zod_1.z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(), // Phone number must have at least 10 digits
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }), // Password should be at least 6 characters long
}).refine(data => data.email || data.phone, {
    message: "Either email or phone number is required",
    path: ["email", "phone"], // Ensures that at least one of email or phone is provided
});
const validateUserLogin = (0, validate_middleware_1.default)(exports.loginSchema);
exports.validateUserLogin = validateUserLogin;
const sendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).max(15).optional(), // Validates phone length (min 10, max 15 characters)
});
const validateSendOtp = (0, validate_middleware_1.default)(sendOtpSchema);
exports.validateSendOtp = validateSendOtp;
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).max(15).optional(),
});
const validateForgotPassword = (0, validate_middleware_1.default)(forgotPasswordSchema);
exports.validateForgotPassword = validateForgotPassword;
const ResetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).max(15).optional(),
    otp: zod_1.z.string().length(6),
    password: zod_1.z.string().min(6),
});
const validateResetPassword = (0, validate_middleware_1.default)(ResetPasswordSchema);
exports.validateResetPassword = validateResetPassword;
//# sourceMappingURL=user.validators.js.map