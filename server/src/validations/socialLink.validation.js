const Joi = require("joi");

const createSocialLink = {
  body: Joi.object({
    platform: Joi.string().required(),
    url: Joi.string().uri().required(),
  }),
};

const updateSocialLink = {
  body: Joi.object({
    platform: Joi.string().required(),
    url: Joi.string().uri().required(),
  }),
};

module.exports = { createSocialLink, updateSocialLink };
