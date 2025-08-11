const Joi = require("joi");

const createContact = {
  body: Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(1000).required(),
    userId: Joi.string().max(50).required(),
  }),
};

module.exports = { createContact };
