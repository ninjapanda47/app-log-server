const Joi = require("joi");

module.exports = {
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
};
