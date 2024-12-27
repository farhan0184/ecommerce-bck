"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = exports.sendOtp = exports.validateOtp = exports.storeOtp = void 0;
const moment_1 = __importDefault(require("moment")); // For handling OTP expiration time
const user_model_1 = __importDefault(require("../models/user.model"));
const responseHandler_1 = require("../utils/responseHandler");
const otpUtils_1 = require("../utils/otpUtils");
let otpStore = {};
// Store OTP with expiration time
const storeOtp = (key, otp) => {
    const expiresAt = (0, moment_1.default)().add(2, "minutes").unix(); // OTP expiration time (2 minutes)
    otpStore[key] = { otp, expiresAt };
};
exports.storeOtp = storeOtp;
// Validate OTP
const validateOtp = (key, otp) => {
    const storedOtp = otpStore[key];
    if (storedOtp && storedOtp.otp === otp && (0, moment_1.default)().unix() < storedOtp.expiresAt) {
        return true; // OTP is valid and not expired
    }
    return false; // OTP is invalid or expired
};
exports.validateOtp = validateOtp;
const sendOtp = async (req, res) => {
    const { body } = req.body;
    const otp = (0, otpUtils_1.generateOtp)();
    try {
        if (body.email) {
            // Send OTP to email
            await (0, otpUtils_1.sendOtpToEmail)(body.email, otp);
            (0, exports.storeOtp)(body.email, otp);
            (0, responseHandler_1.sendSuccess)(res, "OTP sent to email.", { ...body, otp: otp });
        }
        else if (body.phone) {
            // Send OTP to phone
            await (0, otpUtils_1.sendOtpToPhone)(body.phone, otp);
            (0, exports.storeOtp)(body.phone, otp);
            (0, responseHandler_1.sendSuccess)(res, "OTP sent to phone.", { ...body, otp: otp });
        }
        else {
            (0, responseHandler_1.sendError)(res, "Email or phone number is required", 400);
        }
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};
exports.sendOtp = sendOtp;
const register = async (req, res) => {
    const { body } = req;
    const { otp, password, name } = body;
    const key = body.email || body.phone;
    if (!(0, exports.validateOtp)(key, otp)) {
        return (0, responseHandler_1.sendError)(res, "Invalid OTP", 401);
    }
    // Create new user
    const newUser = new user_model_1.default({
        email: body.email,
        phone: body.phone,
        password,
        name
    });
    try {
        // Save user to MongoDB
        await newUser.save();
        delete otpStore[key];
        (0, responseHandler_1.sendSuccess)(res, "Registration successful");
    }
    catch (error) {
        console.error("Error during registration", error);
        (0, responseHandler_1.sendError)(res, "Registration failed");
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { body } = req;
        let user;
        if (body.email) {
            user = await user_model_1.default.findOne({ email: body.email });
        }
        else if (body.phone) {
            user = await user_model_1.default.findOne({ phone: body.phone });
        }
        if (!user) {
            (0, responseHandler_1.sendError)(res, "Invalid credentials", 400);
        }
        // Compare the entered password with the stored hashed password
        const isPasswordValid = user.comparePassword(body.password, user.password);
        if (!isPasswordValid) {
            (0, responseHandler_1.sendError)(res, "Invalid credentials", 400);
        }
        const token = user.generateJwt();
        const { password, ...withoutPassword } = user._doc;
        const data = {
            withoutPassword,
            token
        };
        (0, responseHandler_1.sendSuccess)(res, "Login successful", data);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    const { body } = req;
    const otp = (0, otpUtils_1.generateOtp)();
    try {
        // Check if email or phone exists (for demo purposes, you can add your logic to verify existence)
        if (body.email) {
            // Send OTP to email
            await (0, otpUtils_1.sendOtpToEmail)(body.email, otp);
            (0, exports.storeOtp)(body.email, otp);
            (0, responseHandler_1.sendSuccess)(res, "OTP sent to email.", { ...body, otp: otp });
        }
        else if (body.phone) {
            // Send OTP to phone
            await (0, otpUtils_1.sendOtpToPhone)(body.phone, otp);
            (0, exports.storeOtp)(body.phone, otp);
            (0, responseHandler_1.sendSuccess)(res, "OTP sent to phone.", { ...body, otp: otp });
        }
        else {
            (0, responseHandler_1.sendError)(res, "Email or phone number is required", 400);
        }
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    const { body } = req;
    const { otp, password } = req.body;
    try {
        const key = body.email || body.phone;
        if (!(0, exports.validateOtp)(key, otp)) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }
        let user;
        if (body.email) {
            user = await user_model_1.default.findOne({ email: body.email });
        }
        else if (body.phone) {
            user = await user_model_1.default.findOne({ phone: body.phone });
        }
        if (!user) {
            (0, responseHandler_1.sendError)(res, "Invalid credentials", 400);
        }
        user.password = password;
        // Make sure to hash the password in production
        await user.save();
        delete otpStore[key];
        (0, responseHandler_1.sendSuccess)(res, "Password reset successfully.");
    }
    catch (error) {
        console.error("Error in reset-password route:", error);
        (0, responseHandler_1.sendError)(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};
exports.resetPassword = resetPassword;
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database, excluding the password field
        const users = await user_model_1.default.find({}, { password: 0 }).lean(); // Use `lean()` for plain JS objects
        (0, responseHandler_1.sendSuccess)(res, "Users fetched successfully", users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        (0, responseHandler_1.sendError)(res, "Failed to fetch users", 500);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=auth.controlers.js.map