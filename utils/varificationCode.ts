export const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};