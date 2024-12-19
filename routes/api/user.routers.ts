import { Router } from "express";
import { validateForgotPassword, validateResetPassword, validateSendOtp, validateUserLogin, validateUserRegister } from "../../validators/user.validators";
import { forgotPassword, login, register, resetPassword, sendOtp } from "../../controllers/auth.controlers";





const userRoutes = Router()


userRoutes.post("/register", validateUserRegister, register);
userRoutes.post("/send-otp", validateSendOtp, sendOtp);
userRoutes.post("/login", validateUserLogin, login);
userRoutes.post("/forgot-password", validateForgotPassword, forgotPassword);
userRoutes.post("/reset-password", validateResetPassword, resetPassword);



export default userRoutes