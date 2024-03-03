import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
