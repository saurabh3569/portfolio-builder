const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const portfolioValidation = require("../../validations/portfolio.validation");
const portfolioController = require("../../controllers/portfolio.controller");

const router = express.Router();

router.get("/:username", portfolioController.getPublicPortfolio);

router.get("/", auth(), portfolioController.getUserPortfolio);

router.put(
  "/",
  auth(),
  validate(portfolioValidation.updatePortfolio),
  portfolioController.updatePortfolio
);

router.put(
  "/visibility",
  auth(),
  validate(portfolioValidation.updatePortfolioVisibility),
  portfolioController.updatePortfolioVisibility
);

module.exports = router;
