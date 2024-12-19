import { Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import config from "../config";


const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        index: true,
        
    },
    phone: {
        type: String,
        index: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'vendor', 'employee', 'user'],
        default: 'user',
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    
   
}, { timestamps: true })


schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

schema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

schema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id,
        role: this.role,
    }, config.jwt.secret, { expiresIn: '1d' });
}

interface User {
    _id: ObjectId;
    name: string;
    email: string;
    dob: string;
    role: string;
    gender: string,
}

interface UserMethods {
    comparePassword(password: string): Promise<boolean>;

    generateJwt(): string;
}

// @ts-ignore
type UserModel = Model<User, {}, UserMethods>

const User = model<UserModel>('user', schema);
export default User;