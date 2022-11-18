const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const secret = config.get("jwtSecret");

//Patient Model
const Patient = require("../model/Patient");

// @router POST api/patient/
// @desc   Add patient
// @access Public
router.post("/", async (req, res) => {
  const newPatient = new Patient({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    healthHistory: req.body.healthHistory,
  });
  newPatient
    .save()
    .then((patient) =>
      res.json({ patient, msg: "New patient added!", success: true })
    );
});

// @router GET api/patient
// @desc   Get all patient
// @access Public
router.get("/", async (req, res) => {
  Patient.find().then((patient) =>
    res.json({ patient, msg: "All patients.", success: true })
  );
});

module.exports = router;
