const Education = require("../models/education.model");
const Portfolio = require("../models/portfolio.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getEducation = async (req, res) => {
  const education = await Education.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  res.send(education);
};

const listEducation = async (req, res) => {
  const educations = await Education.find({ portfolio: req.user.portfolio });

  res.send(educations);
};

const createEducation = async (req, res) => {
  let education = new Education({ ...req.body, portfolio: req.user.portfolio });

  await education.save();

  await Portfolio.findByIdAndUpdate(
    education.portfolio,
    {
      $push: { educations: education._id },
    },
    { new: true }
  );

  res.send(education);
};

const updateEducation = async (req, res) => {
  let education = await Education.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  Object.assign(education, req.body);
  await education.save();

  res.send(education);
};

const deleteEducation = async (req, res) => {
  let education = await Education.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!education) {
    throw new ApiError(status.NOT_FOUND, "Education not found");
  }

  await education.deleteOne();

  res.send(education);
};

module.exports = {
  getEducation,
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
