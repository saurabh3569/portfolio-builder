const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const skillValidation = require("../../validations/skill.validation");
const skillController = require("../../controllers/skill.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), skillController.getSkill);

// List
router.get("/", auth(), skillController.listSkill);

// Create
router.post(
  "/",
  auth(),
  validate(skillValidation.createSkill),
  skillController.createSkill
);

// Update
router.put(
  "/:id",
  auth(),
  validate(skillValidation.updateSkill),
  skillController.updateSkill
);

// Delete
router.delete("/:id", auth(), skillController.deleteSkill);

module.exports = router;
