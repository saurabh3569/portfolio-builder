const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const portfolioValidation = require("../../validations/portfolio.validation");
const portfolioController = require("../../controllers/portfolio.controller");

const router = express.Router();

/**
 * @swagger
 * /v1/username:
 *   get:
 *     summary: Get portfolio
 *     responses:
 *       200:
 *         description: Portfolio data
 */
router.get("/:username", portfolioController.getPublicPortfolio);

/**
 * @swagger
 * /v1/users/:userId:
 *   get:
 *     summary: Get portfolio
 *     responses:
 *       200:
 *         description: Portfolio data
 */
router.get("/", auth(), portfolioController.getUserPortfolio);

/**
 * @swagger
 * /v1/portfolio:
 *   put:
 *     summary: Update portfolio
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated portfolio
 */
router.put(
  "/",
  auth(),
  validate(portfolioValidation.updatePortfolio),
  portfolioController.updatePortfolio
);

module.exports = router;
