"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpToPhone = exports.sendOtpToEmail = exports.generateOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const twilio_1 = __importDefault(require("twilio"));
const crypto_1 = __importDefault(require("crypto"));
const index_1 = __importDefault(require("../config/index"));
// Email and Twilio configuration
const emailTransporter = nodemailer_1.default.createTransport({
    host: index_1.default.smtp.host,
    port: index_1.default.smtp.port,
    secure: true,
    auth: {
        user: index_1.default.smtp.user,
        pass: index_1.default.smtp.pass,
    },
});
const twilioClient = (0, twilio_1.default)(index_1.default.twilio.accountSid, index_1.default.twilio.authToken);
// Generate OTP (6-digit number)
const generateOtp = () => {
    return crypto_1.default.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};
exports.generateOtp = generateOtp;
// Send OTP to email
const sendOtpToEmail = async (email, otp) => {
    const mailOptions = {
        from: index_1.default.smtp.user,
        to: email,
        subject: "Your Registration OTP",
        text: `Your OTP for registration is: ${otp}. It will expire in 2 minutes.`,
    };
    await emailTransporter.sendMail(mailOptions);
};
exports.sendOtpToEmail = sendOtpToEmail;
// Send OTP to phone (via Twilio)
const sendOtpToPhone = async (phone, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP for registration is: ${otp}. It will expire in 2 minutes.`,
        from: index_1.default.twilio.from, // Your Twilio phone number
        to: phone,
    });
};
exports.sendOtpToPhone = sendOtpToPhone;
//# sourceMappingURL=otpUtils.js.map