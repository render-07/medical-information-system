const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Patient Model
const Patient = require("../model/Patient");

// @router POST api/user/patient/
// @desc   Add patient
// @access Public
router.post("/", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    mobileNumber,
    email,
    age,
    gender,
    password,
  } = req.body;

  // There must be no email existing in physician
  const physician = await Physician.findOne({ email: email });
  if (physician) {
    return res.json({
      msg: "Email existing in physician.",
      success: false,
    });
  }
  // Check existing patient
  Patient.findOne({ email: email }).then((patient) => {
    if (patient) {
      return res.json({
        msg: "Email existing in patient.",
        success: false,
      });
    }
    const newPatient = new Patient({
      firstName,
      middleName,
      lastName,
      fullName: firstName + " " + middleName + " " + lastName,
      mobileNumber,
      email,
      age,
      gender,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPatient.password, salt, (err, hash) => {
        if (err) throw err;
        newPatient.password = hash;
        newPatient.save().then((patient) => {
          jwt.sign(
            { id: patient.id },
            config.get("jwtSecret"),
            { expiresIn: 10 },
            (err, token) => {
              if (!err) {
                return res.json({
                  msg: "New patient registered!",
                  success: true,
                });
              }
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  firstName: user.firstName,
                  middleName: user.middleName,
                  lastName: user.lastName,
                  fullName:
                    user.firstName +
                    " " +
                    user.middleName +
                    " " +
                    user.lastName,
                  mobileNumber: user.mobileNumber,
                  email: user.email,
                  age: user.age,
                  gender: user.gender,
                  healthHistory: user.healthHistory,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @router GET api/user/patient
// @desc   Get all patient
// @access Public
router.get("/", async (req, res) => {
  Patient.find().then((patients) =>
    res.json({ patients, msg: "All patients.", success: true })
  );
});

module.exports = router;
