import { z } from 'zod';
import validate from '../middlewares/validate.middleware';

const registerUserSchema = z.object({
    action: z.string({ required_error: "Acction should be required" }),
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
}).refine((data) => (!!data.email || !!data.phone), {
    message: "Phone or email should be required",
    path: ["email", "phone"]
});

const validateUserRegister = validate(registerUserSchema)



export {validateUserRegister}
