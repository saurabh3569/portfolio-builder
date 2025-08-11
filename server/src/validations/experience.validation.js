const Joi = require("joi");

const createExperience = {
  body: Joi.object({
    title: Joi.string().max(50).required(),
    company: Joi.string().max(100).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    description: Joi.string().max(1000).allow(null),
    technologies: Joi.array().items(Joi.string().max(50)).allow(null),
  }),
};

const updateExperience = {
  body: Joi.object({
    title: Joi.string().max(100).required(),
    company: Joi.string().max(100).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    description: Joi.string().max(1000).allow(null),
    technologies: Joi.array().items(Joi.string().max(50)).allow(null),
  }),
};

module.exports = { createExperience, updateExperience };
