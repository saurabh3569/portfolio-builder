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

  res.send(experience);
};

const listExperience = async (req, res) => {
  const experiences = await Experience.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  res.send(experiences);
};

const createExperience = async (req, res) => {
  const experience = await Experience.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  res.send(experience);
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

  res.send(experience);
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

  res.send(experience);
};

module.exports = {
  getExperience,
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
