const Joi = require("joi");

const createEducation = {
  body: Joi.object({
    degree: Joi.string().required(),
    institution: Joi.string().required(),
    description: Joi.string().allow(null),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
  }),
};

const updateEducation = {
  body: Joi.object({
    degree: Joi.string(),
    institution: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
};

module.exports = { createEducation, updateEducation };
