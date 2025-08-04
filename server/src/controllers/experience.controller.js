const { Experience } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getExperience = async (req, res) => {
  const experience = await Experience.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  return res.json(experience);
};

const listExperience = async (req, res) => {
  const experiences = await Experience.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  return res.json(experiences);
};

const createExperience = async (req, res) => {
  const experience = await Experience.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  return res.json(experience);
};

const updateExperience = async (req, res) => {
  const experience = await Experience.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  await experience.update(req.body);

  return res.json(experience);
};

const deleteExperience = async (req, res) => {
  const experience = await Experience.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!experience) {
    throw new ApiError(status.NOT_FOUND, "Experience not found");
  }

  await experience.destroy();

  return res.json(experience);
};

module.exports = {
  getExperience,
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
