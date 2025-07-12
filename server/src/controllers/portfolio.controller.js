const {
  Portfolio,
  User,
  Education,
  Experience,
  Project,
  Skill,
  SocialLink,
} = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const redis = require("../config/redis");

const getPublicPortfolio = async (req, res) => {
  const username = req.params.username;

  const cachedPortfolio = await redis.get(username);

  if (cachedPortfolio) {
    return res.send(JSON.parse(cachedPortfolio));
  }

  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const portfolio = await Portfolio.findOne({
    where: {
      user_id: user.id,
      isPublic: true,
    },
    include: [
      { model: Education, as: "educations" },
      { model: Experience, as: "experiences", order: [["startDate", "DESC"]] },
      { model: Project, as: "projects" },
      { model: Skill, as: "skills" },
      { model: SocialLink, as: "socialLinks" },
    ],
  });

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  portfolio.dataValues.user = user;

  await redis.set(user.username, JSON.stringify(portfolio), "EX", 60 * 60); // 1 hour

  res.send(portfolio);
};

const getUserPortfolio = async (req, res) => {
  const userId = req.user.id;

  const portfolio = await Portfolio.findOne({
    where: { user_id: userId },
    include: [
      { model: User, as: "user" },
      { model: Education, as: "educations" },
      { model: Experience, as: "experiences" },
      { model: Project, as: "projects" },
      { model: Skill, as: "skills" },
      { model: SocialLink, as: "socialLinks" },
    ],
  });

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  res.send(portfolio);
};

const updatePortfolio = async (req, res) => {
  const userId = req.user.id;

  let portfolio = await Portfolio.findOne({
    where: { user_id: userId },
  });

  console.log(req.body);

  if (!portfolio) {
    portfolio = await Portfolio.create({
      user_id: userId,
      ...req.body,
    });
  } else {
    await portfolio.update(req.body);
  }

  res.send(portfolio);
};

const updatePortfolioVisibility = async (req, res) => {
  const userId = req.user.id;

  let portfolio = await Portfolio.findOne({
    where: { user_id: userId },
    include: [{ model: User, as: "user", attributes: ["username"] }],
  });

  if (!portfolio) {
    portfolio = await Portfolio.create({
      user_id: userId,
      ...req.body,
    });
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
