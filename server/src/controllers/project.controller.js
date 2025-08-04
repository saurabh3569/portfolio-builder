const { Project } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  return res.json(project);
};

const listProject = async (req, res) => {
  const projects = await Project.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  return res.json(projects);
};

const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  return res.json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  await project.update(req.body);

  return res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  await project.destroy();

  return res.json(project);
};

module.exports = {
  getProject,
  listProject,
  createProject,
  updateProject,
  deleteProject,
};
