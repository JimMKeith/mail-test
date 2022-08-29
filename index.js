"use strict";
const express = require("express");
const router = express.Router();
const app = express();
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const SMTPPool = require("nodemailer/lib/smtp-pool");
const SMTPServer = require("smtp-server").SMTPServer;

dotenv.config({ path: "./.env" });
app.set("port", process.env.WEBSERVER_PORT || 3000);
console.log(`The port is: ${app.get("port")}`);

/* const server = new SMTPServer({});

server.listen(app.get("port"), "127.0.0.1", () => {
  console.log("mail server is bound");
});

server.on("error", (err) => {
  console.log("Error %s", err.message);
}); */

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

// need to get data from the forms --------------------
// parse URL-encoded bodies (as sent by the HTML forms)
app.use(express.urlencoded({ extended: false }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());
// -----------------------------------------------------

app.use(expressLayouts);
app.set("layout", "./layouts/wholePage.ejs");
app.set("view engine", "ejs");

// Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(app.get("port"), () => {
  console.log(
    `Server is up and running on http://localhost:${app.get("port")}`
  );
});
