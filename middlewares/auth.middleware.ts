import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import config from '../config';

const secret = config.jwt.secret

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret)
        next()
        return
    } catch (err) {
        next()
    }
}