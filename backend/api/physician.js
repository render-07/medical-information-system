const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Physician Model
const Physician = require("../model/Physician");

//Patient Model
const Patient = require("../model/Patient");

// @router POST api/user/physician
// @desc   Add physician
// @access Public
router.post("/", async (req, res) => {
  // Deconstructuring
  const { firstName, lastName, mobileNumber, email, workAddress, password } =
    req.body;

  // Check existing physician
  Physician.findOne({ email: email }).then((physician) => {
    if (physician) {
      return res.json({
        msg: "Email existing.",
        success: false,
      });
    }

    const newPhysician = new Physician({
      firstName,
      lastName,
      fullName: firstName + " " + lastName,
      mobileNumber,
      email,
      workAddress,
      licenses:
        "https://drive.google.com/uc?export=view&id=" + req.body.licenses,
      certificates:
        "https://drive.google.com/uc?export=view&id=" + req.body.certificates,
      image: "https://drive.google.com/uc?export=view&id=" + req.body.image,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPhysician.password, salt, (err, hash) => {
        if (err) throw err;
        newPhysician.password = hash;
        newPhysician.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 10 },
            (err, token) => {
              if (!err) {
                return res.json({
                  msg: "New physician registered!",
                  success: true,
                });
              }
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  fullName: firstName + " " + lastName,
                  mobileNumber: user.mobileNumber,
                  email: user.email,
                  workAddress: user.workAddress,
                  licenses:
                    "https://drive.google.com/uc?export=view&id=" +
                    user.licenses,
                  certificates:
                    "https://drive.google.com/uc?export=view&id=" +
                    user.certificates,
                  image:
                    "https://drive.google.com/uc?export=view&id=" + user.image,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @router GET api/user/physician
// @desc   Get all physician
// @access Public
router.get("/", async (req, res) => {
  Physician.find().then((physicians) =>
    // res.json({ physicians, msg: "All physicians.", success: true })
    res.json({ physicians })
  );
});

// @router GET api/user/physician/get-patient-email"
// @desc   Get patient's email by name
// @access Public
router.get("/get-patient-email", async (req, res) => {
  let patientFullName = req.query.fullName;

  Patient.find({
    fullName: patientFullName,
  })
    .select("email -_id")
    .then((email) =>
      res.json({ email, msg: "Returns one patient's email.", success: true })
    );
});

module.exports = router;
