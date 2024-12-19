"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = async (req, res) => {
    try {
        const { body } = req;
        const existingUser = await user_model_1.default.findOne({
            $or: [{ email: body.email }, { phone: body.phone }]
        });
        if (existingUser) {
            (0, responseHandler_1.sendError)(res, 'Email or phone already exists', 400);
        }
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=auth.controlers.js.map