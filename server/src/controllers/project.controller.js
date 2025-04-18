const Project = require("../models/project.model");
const Portfolio = require("../models/portfolio.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getProject = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  res.send(project);
};

const listProject = async (req, res) => {
  const projects = await Project.find({ portfolio: req.user.portfolio });
  res.send(projects);
};

const createProject = async (req, res) => {
  let project = await Project.create({
    ...req.body,
    portfolio: req.user.portfolio,
  });

  await Portfolio.findByIdAndUpdate(
    project.portfolio,
    {
      $push: { projects: project._id },
    },
    { new: true }
  );

  res.send(project);
};

const updateProject = async (req, res) => {
  let project = await Project.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  Object.assign(project, req.body);
  await project.save();

  res.send(project);
};

const deleteProject = async (req, res) => {
  let project = await Project.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found");
  }

  await project.deleteOne();

  res.send(project);
};

module.exports = {
  getProject,
  listProject,
  createProject,
  updateProject,
  deleteProject,
};
