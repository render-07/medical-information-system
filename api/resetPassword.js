const express = require("express");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Physician Model
const Physician = require("../model/Physician");
//Patient Model
const Patient = require("../model/Patient");
// Token Model
const Token = require("../model/Token");

// @router POST api/reset-password
// @desc   POST reset password
// @access Public
router.post("/link-sent", async (req, res) => {
  const { email } = req.body;

  const physician = await Physician.findOne({ email });
  const patient = await Patient.findOne({ email });

  if (!physician && !patient) {
    return res.json({
      msg: "Email not existing.",
      success: false,
    });
  }

  let token = await Token.findOne({ email });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(10));

  const newToken = new Token({
    email,
    token: hash,
  });

  newToken.save().catch((error) => console.log(error));

  let clientURL = "rtumistorage.herokuapp.com/reset-password";

  const link = `${clientURL}/updateYourPassword?token=${resetToken}&email=${email}`;
  sendEmail(
    email,
    "Password Reset Request",
    { email: email, link: link },
    "./template/requestResetPassword.handlebars"
  )
    .then((data) =>
      res.json({
        msg: "A link is sent to your email.",
        success: true,
      })
    )
    .catch((error) => console.log(error));
});

router.put("/update-password", async (req, res) => {
  //console.log(req.body);
  const { newPassword, token, email } = req.body;

  let passwordResetToken = await Token.findOne({ email });
  if (!passwordResetToken) {
    console.log("Token not find");
    return res.json({
      msg: "Invalid or expired password reset token. Try again.",
      success: false,
    });
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    console.log("Token not valid");
    return res.json({
      msg: "Invalid or expired password reset token. Try again.",
      success: false,
    });
  }
  const hash = await bcrypt.hash(newPassword, Number(10));

  const physician = await Physician.findOne({ email: email });
  const patient = await Patient.findOne({ email: email });

  if (physician) {
    await Physician.updateOne({ email }, { $set: { password: hash } })
      .then((data) => {
        sendEmail(
          email,
          "Physician user: Password Reset Successfully.",
          {
            name: physician.fullName,
          },
          "./template/resetPassword.handlebars"
        );
        return res.json({
          msg: "Physician user: Password reset successfully. You can now exit this page.",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          msg: err,
          success: false,
        });
      });
  }

  if (patient) {
    await Patient.updateOne({ email }, { $set: { password: hash } })
      .then((data) => {
        sendEmail(
          email,
          "Patient user: Password Reset Successfully.",
          {
            name: patient.fullName,
          },
          "./template/resetPassword.handlebars"
        );
        return res.json({
          msg: "Patient user: Password reset successfully. You can now exit this page.",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          msg: err,
          success: false,
        });
      });
  }

  await passwordResetToken.deleteOne();
});

module.exports = router;
