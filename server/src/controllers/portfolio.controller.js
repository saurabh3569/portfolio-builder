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
const { s3Service } = require("../services/s3.service");

const getPublicPortfolio = async (req, res) => {
  const username = req.params.username;

  const cachedPortfolio = await redis.get(username);

  if (cachedPortfolio) {
    return res.json(JSON.parse(cachedPortfolio));
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
      { model: Experience, as: "experiences" },
      { model: Project, as: "projects" },
      { model: Skill, as: "skills" },
      { model: SocialLink, as: "socialLinks" },
    ],
    order: [
      [{ model: Experience, as: "experiences" }, "startDate", "DESC"],
      [{ model: Education, as: "educations" }, "startDate", "DESC"],
    ],
  });

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  portfolio.dataValues.user = user;

  await redis.set(user.username, JSON.stringify(portfolio), "EX", 60 * 60); // 1 hour

  return res.json(portfolio);
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
    order: [
      [{ model: Experience, as: "experiences" }, "startDate", "DESC"],
      [{ model: Education, as: "educations" }, "startDate", "DESC"],
    ],
  });

  if (!portfolio) {
    throw new ApiError(status.NOT_FOUND, "Portfolio not found");
  }

  return res.json(portfolio);
};

const updatePortfolio = async (req, res) => {
  const userId = req.user.id;

  let portfolio = await Portfolio.findOne({
    where: { user_id: userId },
  });

  if (!portfolio) {
    portfolio = await Portfolio.create({
      user_id: userId,
      ...req.body,
    });
  } else {
    await portfolio.update(req.body);
  }

  return res.json(portfolio);
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

  return res.json(portfolio);
};

const uploadResume = async (req, res, next) => {
  if (!req.file) {
    throw new ApiError(status.BAD_REQUEST, "No file uploaded");
  }

  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({
      where: { user_id: userId },
      attributes: ["id", "resume"],
    });

    if (!portfolio) {
      throw new ApiError(status.NOT_FOUND, "Portfolio not found");
    }

    if (portfolio.resume) {
      await s3Service.deleteFileFromS3(portfolio.resume);
    }

    const resumeUrl = await s3Service.uploadFileToS3(req.file, next);

    portfolio.resume = resumeUrl;
    await portfolio.save();

    return res.json({ message: "Resume uploaded successfully", resumeUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicPortfolio,
  getUserPortfolio,
  updatePortfolio,
  updatePortfolioVisibility,
  uploadResume,
};
