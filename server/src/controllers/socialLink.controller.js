const { SocialLink } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

const getSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!socialLink) {
    throw new ApiError(status.NOT_FOUND, "SocialLink not found");
  }

  res.send(socialLink);
};

const listSocialLink = async (req, res) => {
  const socialLinks = await SocialLink.findAll({
    where: {
      portfolio_id: req.user.portfolio.id,
    },
  });

  res.send(socialLinks);
};

const createSocialLink = async (req, res) => {
  const socialLink = await SocialLink.create({
    ...req.body,
    portfolio_id: req.user.portfolio.id,
  });

  res.send(socialLink);
};

const updateSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!socialLink) {
    throw new ApiError(status.NOT_FOUND, "SocialLink not found");
  }

  await socialLink.update(req.body);

  res.send(socialLink);
};

const deleteSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findOne({
    where: {
      id: req.params.id,
      portfolio_id: req.user.portfolio.id,
    },
  });

  if (!socialLink) {
    throw new ApiError(status.NOT_FOUND, "SocialLink not found");
  }

  await socialLink.destroy();

  res.send(socialLink);
};

module.exports = {
  getSocialLink,
  listSocialLink,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
