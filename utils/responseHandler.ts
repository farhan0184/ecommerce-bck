import { Response } from 'express';

interface ResponseData {
  status: string;
  message: string;
  data?: any;
}

export const sendSuccess = (res: Response, message: string, data?: any, statusCode: number = 200): Response => {
  const response: ResponseData = {
    status: 'success',
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, message: string, statusCode: number = 500): Response => {
  const response: ResponseData = {
    status: 'error',
    message,
  };
  return res.status(statusCode).json(response);
};
