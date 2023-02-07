const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    default: null,
    required: true,
  },
  lastname: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    default: null,
    required: true,
  },
  password: {
    type: String,
    default: null,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
