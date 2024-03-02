// server.js
// where your node app starts

// init project
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


app.use(express.static(path.resolve(__dirname, '../dist')));


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
