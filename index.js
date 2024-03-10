const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const EMAIL = process.env.EMAIL;
const EMAIL_APP_KEY = process.env.EMAIL_APP_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get", (req, res) => {
  res.send("Emailer Service");
});

app.post("/", (req, res) => {
  console.dir(req.body);

  let mailOptions = {
    from: "your-email@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.data,
  };

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_APP_KEY,
    },
  });

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    // console.log(info);
    if (error) {
      return console.log(error);
    } else {
      res.send("Email Enviado");
    }
    console.log("Message sent: %s", info.messageId);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
