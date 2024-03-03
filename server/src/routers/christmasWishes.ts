import { Router } from "express";
import { body } from "express-validator";

import { sendLetterToSanta } from "../handlers/christmasWishesHandler";

import { handleInputErrors } from "../modules/middleware";

const christmasWishesRouter = Router();

const wishesValidation = [
  body("id").exists().withMessage("Missing 'id' property"),
  body("message")
    .exists().withMessage("Missing 'message' property.").bail()
    .isString().withMessage("Must be a string.").bail()
    .isLength({ min: 10 }).bail()
    .withMessage("The message must contain at least 10 characters.").bail()
    .isLength({ max: 500 }).bail()
    .withMessage("The message can contains a maximum of 500 characters.").bail(),
  handleInputErrors,
];

/**
 * Christmas wishes routes
 */
christmasWishesRouter.post("", ...wishesValidation, sendLetterToSanta);

export default christmasWishesRouter;
