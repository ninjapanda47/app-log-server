const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobUrl: {
    type: String,
  },
  dateApplied: {
    type: Date,
  },
  status: {
    type: String,
  },
  notes: {
    type: String,
  },
  flag: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
