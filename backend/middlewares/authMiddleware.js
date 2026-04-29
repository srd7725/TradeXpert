const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }
  
  jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY || 'your_secret_key', async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    } else {
      req.user = data;
      next();
    }
  });
};
