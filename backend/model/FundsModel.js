const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
  usedMargin: { type: Number, default: 0 },
  availableMargin: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
});

const FundsModel = mongoose.model("Fund", FundsSchema);

module.exports = FundsModel;
