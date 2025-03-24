const Experience = require("../models/experience.model");
const Portfolio = require("../models/portfolio.model");

const getExperience = async (req, res) => {
  const experience = await Experience.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!experience) {
    return res.status(404).json({ message: "Experience not found" });
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
    return res.status(404).json({ message: "Experience not found" });
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
    return res.status(404).json({ message: "Experience not found" });
  }

  await experience.deleteOne();

  return experience;
};

module.exports = {
  getExperience,
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
