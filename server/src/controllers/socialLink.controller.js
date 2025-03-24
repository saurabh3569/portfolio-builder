const SocialLink = require("../models/socialLink.model");
const Portfolio = require("../models/portfolio.model");

const getSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!socialLink) {
    return res.status(404).json({ message: "SocialLink not found" });
  }

  res.send(socialLink);
};

const listSocialLink = async (req, res) => {
  const socialLinks = await SocialLink.find({ portfolio: req.user.portfolio });
  res.send(socialLinks);
};

const createSocialLink = async (req, res) => {
  let socialLink = await SocialLink.create({
    ...req.body,
    portfolio: req.user.portfolio,
  });

  await Portfolio.findByIdAndUpdate(
    socialLink.portfolio,
    {
      $push: { socialLinks: socialLink._id },
    },
    { new: true }
  );

  res.send(socialLink);
};

const updateSocialLink = async (req, res) => {
  let socialLink = await SocialLink.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!socialLink) {
    return res.status(404).json({ message: "SocialLink not found" });
  }

  Object.assign(socialLink, req.body);
  await socialLink.save();

  res.send(socialLink);
};

const deleteSocialLink = async (req, res) => {
  let socialLink = await SocialLink.findOne({
    _id: req.params.id,
    portfolio: req.user.portfolio,
  });

  if (!socialLink) {
    return res.status(404).json({ message: "SocialLink not found" });
  }

  await socialLink.deleteOne();

  return socialLink;
};

module.exports = {
  getSocialLink,
  listSocialLink,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
