const Portfolio = require("../models/portfolio.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const redis = require("../config/redis");

const getPublicPortfolio = async (req, res) => {
  const username = req.params.username;

  const cachedPortfolio = await redis.get(username);

  if (cachedPortfolio) {
    return res.send(JSON.parse(cachedPortfolio));
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const portfolio = await Portfolio.findOne({ user: user._id, isPublic: true })
    .populate("educations")
    .populate({
      path: "experiences",
      options: { sort: { startDate: -1 } },
    })
    .populate("projects")
    .populate("skills")
    .populate("socialLinks");

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  portfolio.user = user;

  await redis.set(user.username, JSON.stringify(portfolio), "EX", 60 * 60); // 1 hour

  res.send(portfolio);
};

const getUserPortfolio = async (req, res) => {
  const userId = req.user._id;

  const portfolio = await Portfolio.findOne({ user: userId })
    .populate("user")
    .populate("educations")
    .populate("experiences")
    .populate("projects")
    .populate("skills")
    .populate("socialLinks");

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  res.send(portfolio);
};

const updatePortfolio = async (req, res) => {
  const userId = req.user._id;

  let portfolio = await Portfolio.findOne({ user: userId });

  if (!portfolio) {
    portfolio = await Portfolio.create({ user: userId, ...req.body });
  } else {
    portfolio.set(req.body);
    await portfolio.save();
  }
  res.send(portfolio);
};

const updatePortfolioVisibility = async (req, res) => {
  const userId = req.user._id;

  let portfolio = await Portfolio.findOne({ user: userId })
    .select("_id isPublic")
    .populate("user", "username");

  if (!portfolio) {
    portfolio = await Portfolio.create({ user: userId, ...req.body });
  }

  portfolio.isPublic = req.body.isPublic;

  await portfolio.save();

  await redis.del(portfolio.user.username);

  res.send(portfolio);
};

module.exports = {
  getPublicPortfolio,
  getUserPortfolio,
  updatePortfolio,
  updatePortfolioVisibility,
};
