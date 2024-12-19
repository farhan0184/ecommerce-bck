"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(index_1.default.database.url);
        console.log('MongoDB Connected Successfully.');
    }
    catch (e) {
        console.log('Database connection failed.');
        console.log('Retrying in 2 seconds...', index_1.default.database.url);
        setTimeout(() => {
            connectMongo();
        }, 2000);
    }
};
exports.default = connectMongo;
//# sourceMappingURL=database.js.map