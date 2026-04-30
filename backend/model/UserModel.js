const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Your full name is required"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  balance: {
    type: Number,
    default: 50000,
  },
  orders: {
    type: Array,
    default: [],
  },
  positions: {
    type: Array,
    default: [],
  },
  holdings: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
