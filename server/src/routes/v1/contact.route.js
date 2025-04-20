const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const contactValidation = require("../../validations/contact.validation");
const contactController = require("../../controllers/contact.controller");
const rateLimiter = require("../../middlewares/rateLimiter");

const router = express.Router();

// Get
router.get("/:id", auth(), contactController.getContact);

// List
router.get("/", auth(), contactController.listContact);

// Create
router.post(
  "/",
  rateLimiter(1, 60), // can be send up to 1 request in every 60 second
  validate(contactValidation.createContact),
  contactController.createContact
);

// Delete
router.delete("/:id", auth(), contactController.deleteContact);

module.exports = router;
