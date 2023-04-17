const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const secret = config.get("jwtSecret");

//Physician Model
const Physician = require("../model/Physician");
const Patient = require("../model/Patient");

// @router POST api/user/login/physician
// @desc   Login physician
// @access Public
router.post("/physician", async (req, res) => {
  const newPhysician = new Physician({
    email: req.body.email,
    password: req.body.password,
  });
  Physician.findOne({ email: req.body.email }, async (err, user) => {
    if (user) {
      let isMatch = await bcrypt.compareSync(
        newPhysician.password,
        user.password
      );

      // Return if password was wrong
      if (!isMatch)
        return res.json({
          success: false,
          code: 400,
          msg: "Invalid Credentials.",
        });
      try {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          secret || "happy",
          { expiresIn: "7d" }
        );
        let withToken = `Bearer ${token}`;
        return res.json({
          success: true,
          data: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName,
            mobileNumber: user.mobileNumber,
            email: user.email,
            workAddress: user.workAddress,
            licenses: user.licenses,
            certificates: user.certificates,
            image: user.image,
            withToken,
          },
          code: 201,
          msg: "Login Success!",
        });
      } catch (error) {
        return res.json({
          success: false,
          msg: "Login Failed.",
          deepLog: error,
          code: 400,
        });
      }
    } else {
      return res.json({ msg: "Invalid Credentials.", success: false, user });
    }
  });
});

// @router POST api/user/login/patient
// @desc   Login patient
// @access Public
router.post("/patient", async (req, res) => {
  const newPatient = new Patient({
    email: req.body.email,
    password: req.body.password,
  });
  Patient.findOne({ email: req.body.email }, async (err, patient) => {
    if (patient) {
      let isMatch = await bcrypt.compareSync(
        newPatient.password,
        patient.password
      );

      // Return if password was wrong
      if (!isMatch)
        return res.json({
          success: false,
          code: 400,
          msg: "Invalid Credentials.",
        });
      try {
        const token = jwt.sign(
          {
            _id: patient._id,
          },
          secret || "happy",
          { expiresIn: "7d" }
        );
        let withToken = `Bearer ${token}`;
        return res.json({
          success: true,
          data: {
            _id: patient._id,
            fullName:
              patient.firstName +
              " " +
              patient.middleName +
              " " +
              patient.lastName,
            mobileNumber: patient.mobileNumber,
            email: patient.email,
            age: patient.age,
            gender: patient.gender,
            withToken,
          },
          code: 201,
          msg: "Login Success!",
        });
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          msg: "Login Failed.",
          deepLog: error,
          code: 400,
        });
      }
    } else {
      return res.json({ msg: "Invalid Credentials.", success: false, patient });
    }
  });
});
module.exports = router;
