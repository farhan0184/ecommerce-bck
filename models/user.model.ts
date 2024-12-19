import { Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { IUser, UserMethods } from "../types/user.types";


const schema = new Schema<IUser>({
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
    location: {
        type: String,
    }
   
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
    }, config.jwt.secret, { expiresIn: '15d' });
}



type UserModel = Model<IUser, {}, UserMethods>

const User = model<UserModel>('user', schema);
export default User;