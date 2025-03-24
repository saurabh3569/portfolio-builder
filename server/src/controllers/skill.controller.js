const Skill = require("../models/skill.model");
const Portfolio = require("../models/portfolio.model");

const getSkill = async (req, res) => {
  const skill = await Skill.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  res.send(skill);
};

const listSkill = async (req, res) => {
  const skills = await Skill.find({ portfolio: req.user.portfolio });
  res.send(skills);
};

const createSkill = async (req, res) => {
  let skill = await Skill.create({
    ...req.body,
    portfolio: req.user.portfolio,
  });

  await Portfolio.findByIdAndUpdate(
    skill.portfolio,
    {
      $push: { skills: skill._id },
    },
    { new: true }
  );

  res.send(skill);
};

const updateSkill = async (req, res) => {
  let skill = await Skill.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  Object.assign(skill, req.body);
  await skill.save();

  res.send(skill);
};

const deleteSkill = async (req, res) => {
  let skill = await Skill.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  await skill.deleteOne();

  return skill;
};

module.exports = {
  getSkill,
  listSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
