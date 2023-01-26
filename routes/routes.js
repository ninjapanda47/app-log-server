const Joi = require("joi");
const handlers = require("../handlers");
const { user, application } = require("../schemas");
const { array, string } = require("joi");

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
    path: "/users",
    handler: handlers.user.createUser,
    options: { validate: { payload: Joi.object(user) } },
  },
  {
    method: "POST",
    path: "/users/login",
    handler: handlers.user.validateUserAndReturnToken,
  },
  {
    method: "GET",
    path: "/applications/{userid}",
    options: {
      auth: "jwt",
      validate: {
        params: Joi.object({
          userid: Joi.string(),
        }),
      },
    },
    handler: handlers.application.getApplications,
  },
  {
    method: "POST",
    path: "/applications",
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
    path: "/applications/{id}",
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
    method: "DELETE",
    path: "/applications",
    options: {
      auth: "jwt",
      validate: {
        payload: Joi.object({
          idsToRemove: Joi.array().items(Joi.string()),
        }),
      },
    },
    handler: handlers.application.removeApplications,
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
