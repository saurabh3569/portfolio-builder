const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    name: Joi.string().required(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9._-]+$/) // Allows letters, numbers, ., -, and _
      .min(3)
      .max(30)
      .required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).max(100).required(),
  }),
};

module.exports = { register, login };
