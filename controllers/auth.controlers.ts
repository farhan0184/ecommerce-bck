import { Request, Response } from "express";
import crypto from "crypto"; // For generating OTP
import moment from "moment";  // For handling OTP expiration time
import User from "../models/user.model";
import config from "../config";
import { sendError, sendSuccess } from "../utils/responseHandler";
import { generateOtp, sendOtpToEmail, sendOtpToPhone } from "../utils/otpUtils";


let otpStore: { [key: string]: { otp: string, expiresAt: number } } = {};


// Store OTP with expiration time
export const storeOtp = (key: string, otp: string): void => {
    const expiresAt = moment().add(2, "minutes").unix(); // OTP expiration time (2 minutes)
    otpStore[key] = { otp, expiresAt };
};

// Validate OTP
export const validateOtp = (key: string, otp: string): boolean => {
    const storedOtp = otpStore[key];
    if (storedOtp && storedOtp.otp === otp && moment().unix() < storedOtp.expiresAt) {
        return true; // OTP is valid and not expired
    }
    return false; // OTP is invalid or expired
};

export const sendOtp = async (req: Request, res: Response) => {
    const { body } = req.body;
    const otp = generateOtp();

    try {
        if (body.email) {
            // Send OTP to email
            await sendOtpToEmail(body.email, otp);
            storeOtp(body.email, otp);
            sendSuccess(res, "OTP sent to email.", {...body, otp: otp});
        } else if (body.phone) {
            // Send OTP to phone
            await sendOtpToPhone(body.phone, otp);
            storeOtp(body.phone, otp);
            sendSuccess(res, "OTP sent to phone.", {...body, otp: otp});
        } else {
            sendError(res, "Email or phone number is required", 400); 
        }
    } catch (error) {
        sendError(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};

export const register = async (req: Request, res: Response) => {
    const { body } = req;
    const {  otp, password, name } = body;

    const key = body.email || body.phone;

    if (!validateOtp(key, otp)) {
        return sendError(res, "Invalid OTP", 401);
    }

    // Create new user
    const newUser = new User({
        email: body.email,
        phone: body.phone,
        password,
        name
    });

    try {
        // Save user to MongoDB
        await newUser.save();

        delete otpStore[key];

        sendSuccess(res,  "Registration successful" );
    } catch (error) {
        console.error("Error during registration", error);
        sendError(res, "Registration failed" );
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        
        const {body} = req

        let user:any;
        if (body.email) {
            user = await User.findOne({email: body.email });
        } else if (body.phone) {
            user = await User.findOne({phone: body.phone });
        }

        if (!user) {
            sendError(res,  "Invalid credentials", 400);
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = user.comparePassword(body.password, user.password);

        if (!isPasswordValid) {
            sendError(res, "Invalid credentials", 400);
        }

        
        const token = user.generateJwt();

        const {password, ...withoutPassword} = user._doc
        
        const data = {
            withoutPassword,
            token
        } 

        sendSuccess(res, "Login successful", data );
    } catch (error) {
        sendError(res,  error.errors ? error.errors[0].message : "Invalid request");
    }
};



export const forgotPassword = async (req: Request, res: Response) => {
    const { body } = req;
    const otp = generateOtp();

    try {
        // Check if email or phone exists (for demo purposes, you can add your logic to verify existence)
        if (body.email) {
            // Send OTP to email
            await sendOtpToEmail(body.email, otp);
            storeOtp(body.email, otp);
            sendSuccess(res, "OTP sent to email.", {...body, otp: otp});
        } else if (body.phone) {
            // Send OTP to phone
            await sendOtpToPhone(body.phone, otp);
            storeOtp(body.phone, otp);
            sendSuccess(res, "OTP sent to phone.", {...body, otp: otp});
        } else {
            sendError(res, "Email or phone number is required", 400); 
        }
    } catch (error) {
        sendError(res, error.errors ? error.errors[0].message : "Invalid request");
    }
};


export const resetPassword = async (req: Request, res: Response) => {
    const { body} = req;
    const { otp, password } = req.body;

    try {

        const key = body.email || body.phone;  

        if (!validateOtp(key, otp)) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        let user:any;
        if (body.email) {
            user = await User.findOne({email: body.email });
        } else if (body.phone) {
            user = await User.findOne({phone: body.phone });
        }

        if (!user) {
            sendError(res,  "Invalid credentials", 400);
        }

        user.password = password;
        
        // Make sure to hash the password in production
        await user.save();

        delete otpStore[key];

        sendSuccess(res, "Password reset successfully.");
    } catch (error) {
        console.error("Error in reset-password route:", error);
        sendError(res,  error.errors ? error.errors[0].message : "Invalid request");
    }
};



export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all users from the database, excluding the password field
        const users = await User.find({}, { password: 0 }).lean(); // Use `lean()` for plain JS objects

        sendSuccess(res, "Users fetched successfully", users);
    } catch (error) {
        console.error("Error fetching users:", error);
        sendError(res, "Failed to fetch users", 500);
    }
};