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
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, 'Password must have at least one uppercase letter, one special character, and be at least 4 characters long'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);