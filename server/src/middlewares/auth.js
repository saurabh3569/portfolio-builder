const jwt = require("jsonwebtoken");
const { status } = require("http-status");
const ApiError = require("../utils/ApiError");
const { User, Portfolio } = require("../models");
const { env } = require("../config/env");
const updatePortfolioCache = require("../utils/updatePortfolioCache");

const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(status.UNAUTHORIZED, "No token provided");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [{ model: Portfolio, as: "portfolio", attributes: ["id"] }],
    });

    if (!user) {
      throw new ApiError(status.NOT_FOUND, "User not found!");
    }

    res.on("finish", async () => {
      await updatePortfolioCache(req, user);
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
