import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

import christmasWishesRouter from "./routers/christmasWishesRouter";

import { IError } from "../../types/src/types";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving website assets from the dist folder
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "../../dist")));

// Christmas wishes
app.use('/api/christmas/wishes', christmasWishesRouter)

// Error handler to be located at the end to catch both synchronous and asynchronous error
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error handler", err);
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "input invalid" });
  } else {
    res.status(500).json({ message: "Internal Server error" });
  }
});

export default app;
