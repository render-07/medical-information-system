const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const secret = config.get("jwtSecret");

//HealthHistory Model
const HealthHistory = require("../model/HealthHistory");

// @router POST api/health-history
// @desc   Add health history
// @access Public
router.post("/", async (req, res) => {
  const {
    patientId,
    healthHistory,
    description,
    yearManifested,
    physicianInCharge,
  } = req.body;

  const newHealthHistory = new HealthHistory({
    patientId,
    healthHistory,
    description,
    yearManifested,
    physicianInCharge,
  });

  newHealthHistory
    .save()
    .then((data) =>
      res.json({
        msg: "New health history added!",
        success: true,
      })
    )
    .catch((error) => console.log(error));
});

// @router GET api/health-history
// @desc   Get all health history
// @access Public
router.get("/", async (req, res) => {
  HealthHistory.find().then((healthHistories) =>
    res.json({ healthHistories, msg: "All health history.", success: true })
  );
});

// @router GET api/health-history/get-one
// @desc   Get all patient
// @access Public
router.get("/get-one", async (req, res) => {
  let patientId = req.query.patientId;
  let physicianInCharge = req.query.physicianInCharge;

  HealthHistory.find({
    patientId: patientId,
    physicianInCharge: physicianInCharge,
  }).then((healthHistories) =>
    res.json({ healthHistories, msg: "Your health history.", success: true })
  );
});

// @router GET api/health-history/patient/my-health-histories
// @desc   Get patient's health histories (used for displaying all health history of logged in patient)
// @access Public
router.get("/patient/my-health-histories", async (req, res) => {
  let patientId = req.query.email;

  HealthHistory.find({
    patientId: patientId,
  })
    // .select("healthHistory physicianInCharge _id")
    .then((healthHistories) =>
      res.json({ healthHistories, msg: "Your health history.", success: true })
    );
});

// @router GET api/health-history/physician/get-patient-health-histories
// @desc   Get patient's health histories (note: physician is logged in: used to get all patient's
//         health history and check for consent of physician have consent to see patient's info)
// @access Public
router.get("/physician/get-patient-health-histories", async (req, res) => {
  let patientId = req.query.email;

  HealthHistory.find({
    patientId: patientId,
  })
    .select("healthHistory physicianInCharge -_id")
    .then((healthHistories) =>
      res.json({
        healthHistories,
        msg: "Patient's health history.",
        success: true,
      })
    );
});

module.exports = router;
