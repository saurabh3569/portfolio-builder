const Joi = require("joi");

const createProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
    liveLink: Joi.string().uri().allow(null, ""),
    sourceCodeLink: Joi.string().uri().allow(null, ""),
  }),
};

const updateProject = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string()),
    liveLink: Joi.string().uri().allow(null, ""),
    sourceCodeLink: Joi.string().uri().allow(null, ""),
  }),
};

module.exports = { createProject, updateProject };
