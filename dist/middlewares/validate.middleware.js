"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        // Validate the request body against the Zod schema
        schema.parse(req.body);
        next();
    }
    catch (error) {
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
exports.default = validate;
//# sourceMappingURL=validate.middleware.js.map