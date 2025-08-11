const Joi = require("joi");

const createSkill = {
  body: Joi.object({
    name: Joi.string().max(100).required(),
    type: Joi.string().max(50).required(),
  }),
};

const updateSkill = {
  body: Joi.object({
    name: Joi.string().max(100).required(),
    type: Joi.string().max(50).required(),
  }),
};

module.exports = { createSkill, updateSkill };
