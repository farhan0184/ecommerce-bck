"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegister = void 0;
const zod_1 = require("zod");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const registerUserSchema = zod_1.z.object({
    action: zod_1.z.string({ required_error: "Acction should be required" }),
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
}).refine((data) => (!!data.email || !!data.phone), {
    message: "Phone or email should be required",
    path: ["email", "phone"]
});
const validateUserRegister = (0, validate_middleware_1.default)(registerUserSchema);
exports.validateUserRegister = validateUserRegister;
//# sourceMappingURL=user.validators.js.map