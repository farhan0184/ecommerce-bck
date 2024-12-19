import { Document } from "mongoose";

export interface IUser extends Document {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    image?: string;
    role?: "admin" | "vendor" | "employee" | "user";
    dob?: Date;
    gender?: "male" | "female";
    location?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface UserMethods {
    comparePassword(password: string): Promise<boolean>;

    generateJwt(): string;
}