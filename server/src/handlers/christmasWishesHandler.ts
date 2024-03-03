import { Request, Response, NextFunction } from "express";

import { fetchUsersFromApi } from "../services/apiService";
import { getCurrentDate, getDateFromStr } from "../services/date";
import { newChristmasWishRequest } from "../services/email";

import { IUser, IUserProfile } from "../types/user";
import { IChristmasRequest } from "../types/christmas";

/**
 * Create a list of wishes for Christmas to Santa Claus. If condition are met.
 * - User must be registered.
 * - User must be less than 10 years old.
 *
 * If the user is not registered (no match for the user id) return an error message.
 * If the user is registered return a successful message.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const sendLetterToSanta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch Data related to users
    const data = await fetchUsersFromApi();

    // **********
    // 1 - Check if the user is registered
    // **********

    const user: IUser = data?.users.filter((user: IUser) => user.username === req.body.username)[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile: IUserProfile = data?.userProfiles.filter(
      (profile: IUserProfile) => profile.userUid === user.uid
    )[0];

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // **********
    // 2 - Check if the user is less than 10 years old
    // **********

    // Compute a date 10 years ago from now
    const minimumDate = getDateFromStr(getCurrentDate());
    minimumDate.setFullYear(minimumDate.getFullYear() - 10);

    const userBirthday = getDateFromStr(userProfile.birthdate);

    if (userBirthday < minimumDate) {
      // Forbidden
      return res.status(403).json({ message: "User is older than 10 years old" });
    } else {
      // **********
      // Add request to the waiting list
      // **********
      console.log("Processing email generation...");
      const reqPayload: IChristmasRequest = {
        username: req.body.username,
        address: userProfile.address,
        message: req.body.message,
      };
      newChristmasWishRequest(reqPayload);

      return res.status(200).json({ message: "The letter has been sent successfully." });
    }
  } catch (error) {
    next(error);
  }
};
