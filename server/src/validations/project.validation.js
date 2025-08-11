const Joi = require("joi");

const createProject = {
  body: Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(1000).allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string().max(50)),
    liveLink: Joi.string().uri().max(200).allow(null, ""),
    sourceCodeLink: Joi.string().uri().max(200).allow(null, ""),
  }),
};

const updateProject = {
  body: Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(1000).allow(null, ""),
    startDate: Joi.date(),
    endDate: Joi.date().allow(null),
    technologies: Joi.array().items(Joi.string().max(50)),
    liveLink: Joi.string().uri().max(200).allow(null, ""),
    sourceCodeLink: Joi.string().uri().max(200).allow(null, ""),
  }),
};

module.exports = { createProject, updateProject };
