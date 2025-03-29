const Joi = require("joi");

const createContact = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

module.exports = { createContact };
