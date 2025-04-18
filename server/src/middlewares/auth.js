const jwt = require("jsonwebtoken");
const { status } = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

module.exports = () => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(status.UNAUTHORIZED, "No token provided");
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      throw new ApiError(401, "Invalid token");
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new ApiError(status.NOT_FOUND, "User not found!");
    }

    req.user = user;

    next();
  });
};
