require("dotenv").config();
const mongoose = require("mongoose");
const {HoldingsModel} = require ("./model/HoldingsModel");
const PositionsModel = require("./model/PositionsModel");
const OrdersModel = require("./model/OrdersModel");
const FundsModel = require("./model/FundsModel");
const User = require("./model/UserModel");

const uri = process.env.MONGO_URI;

mongoose.connect(uri).then(async () => {
  console.log("Connected to DB");
  
  const users = await User.find({});
  console.log(`Found ${users.length} users`);
  
  for (const user of users) {
    const existing = await HoldingsModel.findOne({ userId: user._id });
    if (!existing) {
      console.log(`Seeding data for user ${user.email} (${user._id})`);
      
      const holdingsData = [
        { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
        { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
        { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
        { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
        { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
        { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
        { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%" },
        { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
        { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%" },
        { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
        { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%" },
        { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%" },
        { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" }
      ];

      const positionsData = [
        { product: "MIS", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, day: "-1.24%", isLoss: true },
        { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, day: "-1.35%", isLoss: true },
        { product: "MIS", name: "IDEA", qty: 10, avg: 12.5, price: 11.8, day: "-1.00%", isLoss: true },
        { product: "CNC", name: "AXISBANK", qty: 3, avg: 980, price: 1025, day: "+1.20%", isLoss: false }
      ];

      const ordersData = [
        { name: "INFY", qty: 1, price: 1555, mode: "BUY", status: "Completed" },
        { name: "ITC", qty: 5, price: 207, mode: "SELL", status: "Pending" },
        { name: "TCS", qty: 1, price: 3200, mode: "BUY", status: "Completed" },
        { name: "SBIN", qty: 2, price: 430, mode: "SELL", status: "Cancelled" }
      ];

      const fundsData = {
        balance: 50000,
        usedMargin: 5000,
        availableMargin: 45000
      };

      await HoldingsModel.deleteMany({ userId: user._id });
      await PositionsModel.deleteMany({ userId: user._id });
      await OrdersModel.deleteMany({ userId: user._id });
      await FundsModel.deleteMany({ userId: user._id });

      await HoldingsModel.insertMany(holdingsData.map(item => ({ ...item, userId: user._id })));
      await PositionsModel.insertMany(positionsData.map(item => ({ ...item, userId: user._id })));
      await OrdersModel.insertMany(ordersData.map(item => ({ ...item, userId: user._id })));
      await FundsModel.create({ ...fundsData, userId: user._id });
      console.log(`Seeded data for user ${user._id}`);
    } else {
      console.log(`User ${user.email} already has data.`);
    }
  }

  console.log("Done checking/seeding.");
  process.exit(0);
}).catch(err => {
  console.log("Error:", err);
  process.exit(1);
});
