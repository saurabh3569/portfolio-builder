const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9._-]+$/) // Allows letters, numbers, ., -, and _
      .min(3)
      .max(30)
      .required(),
    location: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { register, login };
