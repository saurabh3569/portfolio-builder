const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.put(
  "/",
  auth(),
  validate(userValidation.updateUser),
  userController.updateUser
);

router.delete("/", auth(), userController.deleteUser);

module.exports = router;
