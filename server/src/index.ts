import * as dotenv from "dotenv";
import path from "path";
// .env must be loaded before importing app
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import app from "./server";

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
