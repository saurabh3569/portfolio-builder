const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const experienceValidation = require("../../validations/experience.validation");
const experienceController = require("../../controllers/experience.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), experienceController.getExperience);

// List
router.get("/", auth(), experienceController.listExperience);

// Create
router.post(
  "/",
  auth(),
  validate(experienceValidation.createExperience),
  experienceController.createExperience
);

// Update
router.put(
  "/:id",
  auth(),
  validate(experienceValidation.updateExperience),
  experienceController.updateExperience
);

// Delete
router.delete("/:id", auth(), experienceController.deleteExperience);

module.exports = router;
