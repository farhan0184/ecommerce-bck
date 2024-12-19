import nodemailer from "nodemailer";
import twilio from "twilio";
import moment from "moment";
import crypto from "crypto";
import config from "../config/index";

// Email and Twilio configuration
const emailTransporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: true,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
    },
});

const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

// Generate OTP (6-digit number)
export const generateOtp = (): string => {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};



// Send OTP to email
export const sendOtpToEmail = async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
        from: config.smtp.user,
        to: email,
        subject: "Your Registration OTP",
        text: `Your OTP for registration is: ${otp}. It will expire in 2 minutes.`,
    };

    await emailTransporter.sendMail(mailOptions);
};

// Send OTP to phone (via Twilio)
export const sendOtpToPhone = async (phone: string, otp: string): Promise<void> => {
    await twilioClient.messages.create({
        body: `Your OTP for registration is: ${otp}. It will expire in 2 minutes.`,
        from: config.twilio.from, // Your Twilio phone number
        to: phone,
    });
};


