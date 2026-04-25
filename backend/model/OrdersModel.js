const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

const OrdersModel = mongoose.model("Order", OrdersSchema);

module.exports = OrdersModel;