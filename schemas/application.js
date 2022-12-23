const Joi = require("joi");

module.exports = {
  userId: Joi.string(),
  companyName: Joi.string(),
  jobTitle: Joi.string(),
  jobUrl: Joi.string(),
  dateApplied: Joi.date(),
  status: Joi.string(),
  notes: Joi.string(),
};
