const Joi = require("joi");

const updatePortfolio = {
  body: Joi.object({
    summary: Joi.string().allow(null),
    resume: Joi.string().allow(null),
  }),
};

module.exports = { updatePortfolio };
