const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const socialLinkValidation = require("../../validations/socialLink.validation");
const socialLinkController = require("../../controllers/socialLink.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), socialLinkController.getSocialLink);

// List
router.get("/", auth(), socialLinkController.listSocialLink);

// Create
router.post(
  "/",
  auth(),
  validate(socialLinkValidation.createSocialLink),
  socialLinkController.createSocialLink
);

// Update
router.put(
  "/:id",
  auth(),
  validate(socialLinkValidation.updateSocialLink),
  socialLinkController.updateSocialLink
);

// Delete
router.delete("/:id", auth(), socialLinkController.deleteSocialLink);

module.exports = router;
