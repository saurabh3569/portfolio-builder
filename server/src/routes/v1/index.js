const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const portfolioRoute = require("./portfolio.route");
const educationRoute = require("./education.route");
const experienceRoute = require("./experience.route");
const skillRoute = require("./skill.route");
const projectRoute = require("./project.route");
const socialLinkRoute = require("./socialLink.route");
const contactRoute = require("./contact.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/portfolio", portfolioRoute);
router.use("/education", educationRoute);
router.use("/experience", experienceRoute);
router.use("/project", projectRoute);
router.use("/skill", skillRoute);
router.use("/social-link", socialLinkRoute);
router.use("/contact", contactRoute);

module.exports = router;
