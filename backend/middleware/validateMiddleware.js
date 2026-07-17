import { validationResult } from "express-validator";

/**
 * Runs after express-validator check() chains on a route.
 * If validation errors exist, responds with 400 and a list of messages
 * instead of letting the request reach the controller.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
