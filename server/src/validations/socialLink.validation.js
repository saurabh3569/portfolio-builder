const Joi = require("joi");

const createSocialLink = {
  body: Joi.object({
    platform: Joi.string().max(50).required(),
    url: Joi.string().uri().max(200).required(),
  }),
};

const updateSocialLink = {
  body: Joi.object({
    platform: Joi.string().max(50).required(),
    url: Joi.string().uri().max(200).required(),
  }),
};

module.exports = { createSocialLink, updateSocialLink };
