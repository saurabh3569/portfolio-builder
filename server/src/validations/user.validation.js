const Joi = require("joi");

const updateUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    phone: Joi.string().max(15),
    password: Joi.string().min(6).max(30),
    name: Joi.string().max(50),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9._-]+$/) // Allows letters, numbers, ., -, and _
      .min(3)
      .max(30),
    location: Joi.string().max(100),
  }),
};

module.exports = { updateUser };
