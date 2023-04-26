const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});

module.exports = Token = mongoose.model("token", TokenSchema);
