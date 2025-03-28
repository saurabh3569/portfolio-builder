const Joi = require("joi");

const createProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
    links: Joi.object({
      live: Joi.string().uri().allow(null, ""),
      sourceCode: Joi.string().uri().allow(null, ""),
    }).allow(null),
  }),
};

const updateProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
    links: Joi.object({
      live: Joi.string().uri().allow(null, ""),
      sourceCode: Joi.string().uri().allow(null, ""),
    }).allow(null),
  }),
};

module.exports = { createProject, updateProject };
