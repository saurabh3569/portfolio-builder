const Joi = require("joi");

const updatePortfolio = {
  body: Joi.object({
    summary: Joi.string().allow(""),
  }),
};

const updatePortfolioVisibility = {
  body: Joi.object({
    isPublic: Joi.boolean().allow(null),
  }),
};

module.exports = { updatePortfolio, updatePortfolioVisibility };
