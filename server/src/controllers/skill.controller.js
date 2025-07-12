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

  res.send(skill);
};

const listSkill = async (req, res) => {
  const skills = await Skill.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  res.send(skills);
};

const createSkill = async (req, res) => {
  const skill = await Skill.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  res.send(skill);
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

  res.send(skill);
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

  res.send(skill);
};

module.exports = {
  getSkill,
  listSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
