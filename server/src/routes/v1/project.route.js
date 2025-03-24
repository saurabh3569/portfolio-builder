const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const projectValidation = require("../../validations/project.validation");
const projectController = require("../../controllers/project.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), projectController.getProject);

// List
router.get("/", auth(), projectController.listProject);

// Create
router.post(
  "/",
  auth(),
  validate(projectValidation.createProject),
  projectController.createProject
);

// Update
router.put(
  "/:id",
  auth(),
  validate(projectValidation.updateProject),
  projectController.updateProject
);

// Delete
router.delete("/:id", auth(), projectController.deleteProject);

module.exports = router;
