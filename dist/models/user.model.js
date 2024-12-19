"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const schema = new mongoose_1.Schema({
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
}, { timestamps: true });
schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
schema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
schema.methods.generateJwt = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        role: this.role,
    }, config_1.default.jwt.secret, { expiresIn: '1d' });
};
const User = (0, mongoose_1.model)('user', schema);
exports.default = User;
//# sourceMappingURL=user.model.js.map