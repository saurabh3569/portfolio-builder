const jwt = require("jsonwebtoken");
const { status } = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const { env } = require("../config/env");

const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(status.UNAUTHORIZED, "No token provided");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new ApiError(status.NOT_FOUND, "User not found!");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
