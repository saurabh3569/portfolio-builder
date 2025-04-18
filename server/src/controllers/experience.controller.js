const Experience = require("../models/experience.model");
const Portfolio = require("../models/portfolio.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getExperience = async (req, res) => {
  const experience = await Experience.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  res.send(experience);
};

const listExperience = async (req, res) => {
  const experiences = await Experience.find({ portfolio: req.user.portfolio });
  res.send(experiences);
};

const createExperience = async (req, res) => {
  let experience = await Experience.create({
    ...req.body,
    portfolio: req.user.portfolio,
  });

  await Portfolio.findByIdAndUpdate(
    experience.portfolio,
    {
      $push: { experiences: experience._id },
    },
    { new: true }
  );

  res.send(experience);
};

const updateExperience = async (req, res) => {
  let experience = await Experience.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  Object.assign(experience, req.body);
  await experience.save();

  res.send(experience);
};

const deleteExperience = async (req, res) => {
  let experience = await Experience.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  await experience.deleteOne();

  res.send(experience);
};

module.exports = {
  getExperience,
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
