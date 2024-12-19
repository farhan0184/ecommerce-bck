import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/responseHandler";
import User from "../models/user.model";

export const createUser = async (req:Request, res:Response)=>{
    try {
        const {body} = req
        const existingUser = await User.findOne({
            $or: [{email: body.email}, {phone: body.phone}]
        })

        if(existingUser){
            sendError(res, 'Email or phone already exists', 400)
        }
        
    } catch (error) {
        sendError(res, error.message)
    }
}