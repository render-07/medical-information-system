const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const HealthHistorySchema = new Schema({
  patientId: {
    type: String,
    required: true,
  },
  healthHistory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  yearManifested: {
    type: String,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  procedures: {
    type: String,
    required: true,
  },
  physicianInCharge: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = HealthHistory = mongoose.model(
  "healthHistory",
  HealthHistorySchema
);
