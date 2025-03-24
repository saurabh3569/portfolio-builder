const Joi = require("joi");

const createProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
  }),
};

const updateProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
  }),
};

module.exports = { createProject, updateProject };
