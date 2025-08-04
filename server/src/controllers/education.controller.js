const { Education } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getEducation = async (req, res) => {
  const education = await Education.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  return res.json(education);
};

const listEducation = async (req, res) => {
  const educations = await Education.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  return res.json(educations);
};

const createEducation = async (req, res) => {
  const education = await Education.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  return res.json(education);
};

const updateEducation = async (req, res) => {
  const education = await Education.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  await education.update(req.body);

  return res.json(education);
};

const deleteEducation = async (req, res) => {
  const education = await Education.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  await education.destroy();

  return res.json(education);
};

module.exports = {
  getEducation,
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
