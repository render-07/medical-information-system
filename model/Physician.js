const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const PhysicianSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  workAddress: {
    type: String,
    required: true,
  },
  licenses: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Physician = mongoose.model("physician", PhysicianSchema);
