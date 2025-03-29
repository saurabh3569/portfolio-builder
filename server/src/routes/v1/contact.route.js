const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const contactValidation = require("../../validations/contact.validation");
const contactController = require("../../controllers/contact.controller");

const router = express.Router();

// Get
router.get("/:id", auth(), contactController.getContact);

// List
router.get("/", auth(), contactController.listContact);

// Create
router.post(
  "/",
  validate(contactValidation.createContact),
  contactController.createContact
);

// Delete
router.delete("/:id", auth(), contactController.deleteContact);

module.exports = router;
