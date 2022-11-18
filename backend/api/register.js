const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../model/User");

// @router POST api/user/register
// @desc   Register user
// @access Public
router.post("/", async (req, res) => {
  // Deconstructuring
  const { firstName, lastName, mobileNumber, email, password } = req.body;

  // Check existing user
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({
        msg: "Email existing.",
        success: false,
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 10 },
            (err, token) => {
              if (!err) {
                return res.json({
                  msg: "New user registered!",
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
                  mobileNumber: user.mobileNumber,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @router GET api/user/register
// @desc   Get all user
// @access Public
router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

module.exports = router;
