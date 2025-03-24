const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

module.exports = () => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, "No token provided");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;

    next();
  });
};
