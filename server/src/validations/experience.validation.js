const Joi = require("joi");

const createExperience = {
  body: Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    description: Joi.string().allow(null),
    technologies: Joi.array().allow(null),
  }),
};

const updateExperience = {
  body: Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    description: Joi.string().allow(null),
    technologies: Joi.array().allow(null),
  }),
};

module.exports = { createExperience, updateExperience };
