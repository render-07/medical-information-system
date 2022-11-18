const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const secret = config.get("jwtSecret");

//User Model
const User = require("../model/User");

// @router POST api/user/login
// @desc   Login user
// @access Public
router.post("/", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (user) {
      let isMatch = await bcrypt.compareSync(newUser.password, user.password);

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
          data: { email: user.email, _id: user._id, withToken },
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

module.exports = router;
