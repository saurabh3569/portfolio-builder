const Joi = require("joi");

const updateUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    phone: Joi.string(),
    password: Joi.string().min(6),
    name: Joi.string(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9._-]+$/) // Allows letters, numbers, ., -, and _
      .min(3)
      .max(30),
    location: Joi.string(),
  }),
};

module.exports = { updateUser };
