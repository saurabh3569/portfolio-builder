const { Skill } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getSkill = async (req, res) => {
  const skill = await Skill.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!skill) {
    throw new ApiError(status.NOT_FOUND, "Skill not found");
  }

  return res.json(skill);
};

const listSkill = async (req, res) => {
  const skills = await Skill.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  return res.json(skills);
};

const createSkill = async (req, res) => {
  const skill = await Skill.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  return res.json(skill);
};

const updateSkill = async (req, res) => {
  const skill = await Skill.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!skill) {
    throw new ApiError(status.NOT_FOUND, "Skill not found");
  }

  await skill.update(req.body);

  return res.json(skill);
};

const deleteSkill = async (req, res) => {
  const skill = await Skill.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!skill) {
    throw new ApiError(status.NOT_FOUND, "Skill not found");
  }

  await skill.destroy();

  return res.json(skill);
};

module.exports = {
  getSkill,
  listSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
