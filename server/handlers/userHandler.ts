// import prisma from "../db";
// import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

// export const createNewUser = async (req, res, next) => {
//   try {

//   1 Create a new user in DB with hashed password
//     const user = await prisma.user.create({
//       data: {
//         username: req.body.username,
//         password: await hashPassword(req.body.password),
//       },
//     });

//  2  Return JWT to user
//     const token = createJWT(user);
//     res.json({ token });
//   } catch (e) {

//     e.type = "input";
//     next(e);
//   }
// };

// export const signin = async (req, res) => {
// 1 Get User info from DB

//  2 Compare password
// const isValid = await comparePasswords(req.body.password, user.password);

//  3 if invalid return 401
//   if (!isValid) {
//     res.status(401);
//     res.json({ message: "authentication failure" });
//     return;
//   }

// 4 if valid create JWT
//   const token = createJWT(user);
//   res.json({ token });
// };
