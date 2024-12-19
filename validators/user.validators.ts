import { z } from 'zod';
import validate from '../middlewares/validate.middleware';

const registerUserSchema = z.object({
    name: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(255, { message: "Name should be at last 255 character" }),
    email: z
        .string()
        .email({ message: "This is a email field" })
        .optional(),
    password: z
        .string({ required_error: "Password is required" })
        .min(4, { message: "Password should be  min 4 character" })
        .max(255, { message: "Password should be at max 255 character" }),
    role: z.enum(["user", "vendor",'employee']).optional(),
    phone: z
        .string()
        .optional(),
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
}).refine((data) => (!!data.email || !!data.phone), {
    message: "Phone or email should be required",
    path: ["email", "phone"]
});

const validateUserRegister = validate(registerUserSchema)


// Zod validation for login input
export const loginSchema = z.object({
    email: z.string().email().optional(),  // Email is optional but must be a valid email if provided
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(),  // Phone number must have at least 10 digits
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }), // Password should be at least 6 characters long
}).refine(data => data.email || data.phone, {
    message: "Either email or phone number is required",
    path: ["email", "phone"],  // Ensures that at least one of email or phone is provided
});

const validateUserLogin= validate(loginSchema)

const sendOtpSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(), // Validates phone length (min 10, max 15 characters)
});

const validateSendOtp = validate(sendOtpSchema)


const forgotPasswordSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
});

const validateForgotPassword = validate(forgotPasswordSchema)


const ResetPasswordSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    otp: z.string().length(6),
    password: z.string().min(6),
});

const validateResetPassword = validate(ResetPasswordSchema)


export {validateUserRegister, validateUserLogin, validateSendOtp,validateForgotPassword, validateResetPassword, }
