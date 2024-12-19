"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const seedDB = async () => {
    try {
        let data = await user_model_1.default.find({ role: 'admin' });
        if (data.length === 0) {
            await user_model_1.default.create({
                name: 'Jisr',
                email: 'admin@gmail.com',
                role: 'admin',
                password: '123456',
            });
            console.log('Admin created successfully.');
        }
    }
    catch (e) {
        console.log(e);
    }
};
exports.seedDB = seedDB;
//# sourceMappingURL=seedDb.js.map