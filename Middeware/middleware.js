import { check, validationResult } from "express-validator";

export function validateEmail(req, res, next) {
    check("email")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .escape()(req, res, next);
}

export function validateInput(req, res, next) {
    if (!req.body || req.body === '' || req.body === undefined || req.body === null) {
        return res.status(400).json({
            message: "Please enter something"
        });
    }
    next();
}
