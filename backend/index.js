require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const {HoldingsModel} = require ("./model/HoldingsModel");

const PositionsModel = require("./model/PositionsModel");

const OrdersModel = require("./model/OrdersModel");
const FundsModel = require("./model/FundsModel");
const User = require("./model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userVerification } = require("./middlewares/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());



// app.get("/addHoldings", async(req, res) =>{
//     let tempHoldings= [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

//     tempHoldings.forEach((item)=>{
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.day,
//             day: item.day,    
//         });

//         newHolding.save();
//     });

//     res.send("Done!");

// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

async function seedUserData(userId) {
  const existing = await HoldingsModel.findOne({ userId });
  if (existing) return;

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

  await HoldingsModel.insertMany(holdingsData.map(item => ({ ...item, userId })));
  await PositionsModel.insertMany(positionsData.map(item => ({ ...item, userId })));
  await OrdersModel.insertMany(ordersData.map(item => ({ ...item, userId })));
  await FundsModel.create({ ...fundsData, userId });
}

app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!(email && password && fullName)) {
      return res.status(400).send("All input is required");
    }

    if (fullName.trim().split(/\s+/).length < 2) {
      return res.status(400).send("Please provide your full name (first name and last name)");
    }

    if (password.length < 8 || password.length > 12) {
      return res.status(400).send("Password must be between 8 and 12 characters");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName: fullName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    await seedUserData(user._id);

    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found, please register");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY || "your_secret_key",
      { expiresIn: "1d" }
    );
    return res.status(200).json({ 
      success: true, 
      token, 
      user: {
        fullName: user.fullName,
        email: user.email
      } 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during login");
  }
});

app.get("/dashboardSummary", userVerification, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    const holdings = await HoldingsModel.find({ userId: req.user.user_id });
    
    let totalInvestment = 0;
    let currentValue = 0;
    
    holdings.forEach((stock) => {
      totalInvestment += stock.avg * stock.qty;
      currentValue += stock.price * stock.qty;
    });

    const totalPnL = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

    res.json({
      userName: user ? user.fullName : "User",
      totalInvestment: totalInvestment.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalPnL: totalPnL.toFixed(2),
      pnlPercentage: pnlPercentage.toFixed(2)
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching summary");
  }
});

app.get("/allHoldings", userVerification, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({ userId: req.user.user_id });
    res.json(allHoldings);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching holdings");
  }
});

app.get("/allPositions", userVerification, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ userId: req.user.user_id });
    res.json(allPositions);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching positions");
  }
});

app.post("/newOrder", userVerification, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user.user_id;

    let newOrder = new OrdersModel({
      name, qty, price, mode, userId
    });
    await newOrder.save();

    if (mode === "BUY") {
      let holding = await HoldingsModel.findOne({ name, userId });
      if (holding) {
        let totalQty = holding.qty + qty;
        let totalCost = (holding.avg * holding.qty) + (price * qty);
        holding.avg = totalCost / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          name, qty, avg: price, price, net: "0.00%", day: "0.00%", userId
        });
      }

      await PositionsModel.create({
        product: "CNC", name, qty, avg: price, price, day: "0.00%", isLoss: false, userId
      });
    } else if (mode === "SELL") {
      let holding = await HoldingsModel.findOne({ name, userId });
      if (holding) {
        if (holding.qty > qty) {
          holding.qty -= qty;
          await holding.save();
        } else {
          await HoldingsModel.deleteOne({ name, userId });
        }
      }

      await PositionsModel.create({
        product: "CNC", name, qty: -qty, avg: price, price, day: "0.00%", isLoss: false, userId
      });
    }

    res.json({ message: "Order processed successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error processing order");
  }
});

app.get("/orders", userVerification, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user.user_id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching orders");
  }
});

app.get("/funds", userVerification, async (req, res) => {
  try {
    let funds = await FundsModel.findOne({ userId: req.user.user_id });
    if (!funds) {
      funds = await FundsModel.create({ userId: req.user.user_id, balance: 0, availableMargin: 0, usedMargin: 0 });
    }
    res.json(funds);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching funds");
  }
});

app.post("/addFunds", userVerification, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    let funds = await FundsModel.findOne({ userId: req.user.user_id });
    if (!funds) {
      funds = await FundsModel.create({ userId: req.user.user_id, balance: amount, availableMargin: amount, usedMargin: 0 });
    } else {
      funds.balance += amount;
      funds.availableMargin += amount;
      await funds.save();
    }
    res.json(funds);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding funds");
  }
});

app.post("/withdrawFunds", userVerification, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    let funds = await FundsModel.findOne({ userId: req.user.user_id });
    if (funds && funds.availableMargin >= amount) {
      funds.balance -= amount;
      funds.availableMargin -= amount;
      await funds.save();
      res.json(funds);
    } else {
      res.status(400).send("Insufficient funds");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error withdrawing funds");
  }
});


mongoose.connect(uri)
  .then(() => {
    console.log("DB Connected ✅");

    app.listen(PORT, () => {
      console.log("App started 🚀");
    });
  })
  .catch((err) => {
    console.log("DB Error ❌:", err);
  });