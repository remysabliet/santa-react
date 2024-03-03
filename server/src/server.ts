import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { IError } from "../../types/dist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Serving website assets from the dist folder
app.use(express.static(path.resolve(__dirname, "../../dist")));

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
