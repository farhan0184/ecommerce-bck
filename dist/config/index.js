"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process = __importStar(require("node:process"));
dotenv_1.default.config({ path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env' });
const config = {
    app_name: process.env.APP_NAME,
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    },
    s3: {
        bucket: process.env.AWS_BUCKET_NAME,
        folder: 'images',
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.SECRET,
    },
    server: {
        port: +process.env.PORT || 8000,
    },
    cors: {
        origin: '*',
        headers: 'Origin, X-Requested-With, Content-Type, Accept',
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
    },
    fileUpload: {
        limits: { fileSize: 50 * 1024 * 1024 },
    },
    message: 'Welcome to the API',
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        from: process.env.TWILIO_PHONE_NUMBER,
        messagingServiceSid: process.env.TWILL0_MESSAGE_SERVICE_SID
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map