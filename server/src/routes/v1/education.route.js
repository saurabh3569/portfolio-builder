const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const educationValidation = require("../../validations/education.validation");
const educationController = require("../../controllers/education.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), educationController.getEducation);

// List
router.get("/", auth(), educationController.listEducation);

// Create
router.post(
  "/",
  auth(),
  validate(educationValidation.createEducation),
  educationController.createEducation
);

// Update
router.put(
  "/:id",
  auth(),
  validate(educationValidation.updateEducation),
  educationController.updateEducation
);

// Delete
router.delete("/:id", auth(), educationController.deleteEducation);

module.exports = router;
