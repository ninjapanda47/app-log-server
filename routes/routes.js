const Joi = require("joi");
const handlers = require("../handlers");
const { user, application } = require("../schemas");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "This is Sandi's backend server for tracking job applications!";
    },
  },
  {
    method: "POST",
    path: "/user/create",
    handler: handlers.user.createUser,
    options: { validate: { payload: Joi.object(user) } },
  },
  {
    method: "POST",
    path: "/user/login",
    handler: handlers.user.validateUserAndReturnToken,
  },
  {
    method: "GET",
    path: "/application",
    options: {
      auth: "jwt",
    },
    handler: handlers.application.getApplications,
  },
  {
    method: "POST",
    path: "/application/create",
    options: {
      auth: "jwt",
      validate: {
        payload: Joi.object(application),
      },
    },
    handler: handlers.application.addApplication,
  },
  {
    method: "PUT",
    path: "/application/{id}",
    options: {
      auth: "jwt",
      validate: {
        params: Joi.object({
          id: Joi.string(),
        }),
        payload: Joi.object({
          update: application,
        }),
      },
    },
    handler: handlers.application.updateApplication,
  },
  {
    method: "GET",
    path: "/report/{startDate}/{endDate}",
    options: {
      auth: "jwt",
      validate: {
        params: Joi.object({
          startDate: Joi.string(),
          endDate: Joi.string(),
        }),
      },
    },
    handler: handlers.report.getJobApplicationReport,
  },
];
