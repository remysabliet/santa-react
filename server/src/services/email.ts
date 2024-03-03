import nodemailer, { SentMessageInfo } from "nodemailer";

import { IChristmasRequest } from "../types/christmas";

const pendingChristmasRequests: IChristmasRequest[] = [];

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USERNAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

/**
 * Will add a new Christmas request to the pending list
 * @param {IChristmasRequest} req a Christmas request
 */
export const newChristmasWishRequest = (req: IChristmasRequest) => {
  pendingChristmasRequests.push(req);
};

/**
 * Every 15s, fetch all pending array from the waiting list
 * and send an email for every of them to Santa Claus
 * @returns {IChristmasRequest[]} list of Christmas requests
 */
const getPendingChristmasRequests = (): IChristmasRequest[] => {
  // Implement your logic to fetch pending requests
  // This will depend on how you're storing these requests
  const req: IChristmasRequest[] = [];

  while (pendingChristmasRequests.length > 0) {
    const request = pendingChristmasRequests.pop();
    if (request !== undefined) {
      req.push(request);
    }
  }
  return req;
};

setInterval(() => {
  const pendingRequests = getPendingChristmasRequests();

  for (let request of pendingRequests) {
    let mailOptions = {
      from: "do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: `${request.username} - be nice - お願いだから`,
      text: `${JSON.stringify(request)}`,
    };

    transporter.sendMail(mailOptions, function (error: Error | null, info: SentMessageInfo) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}, 15000); // 15000 milliseconds = 15 seconds
