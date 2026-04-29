const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  status: { type: String, default: "Pending" }, // Pending, Completed, Cancelled
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const OrdersModel = mongoose.model("Order", OrdersSchema);

module.exports = OrdersModel;