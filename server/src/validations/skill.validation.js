const Joi = require("joi");

const createSkill = {
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

const updateSkill = {
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

module.exports = { createSkill, updateSkill };
