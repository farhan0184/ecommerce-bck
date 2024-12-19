import dotenv from 'dotenv'
import * as process from "node:process";
dotenv.config({path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env'})

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
        limits: {fileSize: 50 * 1024 * 1024},
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
}

export default config;