const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  //Description
  des: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  ctc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eligibility: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("test", TestSchema);
