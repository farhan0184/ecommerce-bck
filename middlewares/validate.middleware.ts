import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the request body against the Zod schema
        schema.parse(req.body);
        next();
    } catch (error) {
        // If validation fails, return a 422 error with the validation message
        if (error instanceof Error) {
            return res.status(422).send({
                error: true,
                msg: error.message,
            });
        }

        return res.status(500).send({
            error: true,
            msg: "An unexpected error occurred during validation",
        });
    }
};

export default validate;