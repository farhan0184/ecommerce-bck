"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, message, data, statusCode = 200) => {
    const response = {
        status: 'success',
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500) => {
    const response = {
        status: 'error',
        message,
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
//# sourceMappingURL=responseHandler.js.map