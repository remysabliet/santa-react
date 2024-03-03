import { Request, Response, NextFunction } from "express";

import { IError } from "../../../types/src/types";

/**
 * Create a list of wishes for Christmas to Santa Claus.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const sendLetterToSanta = async (req: Request, res: Response, next: NextFunction) => {
  console.log("sendLetterToSanta");
  
  try {
    const payload = {
      ...req.body,
    };
    res.json({ data: payload });
  } catch (error) {
    (error as IError).type = "db";
    next(error);
  }
};
