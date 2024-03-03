import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Check for input error(s) stored in the request object by express-validator
 * and send them back to the client with error 400.
 *
 * If no error let the request continue.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    // res.json({ errors: errors.array() })
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
