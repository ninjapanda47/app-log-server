const Joi = require("joi");
const handlers = require("../handlers");
const applicationSchema = require("../schemas/application");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "This is Sandi's backend server for tracking job applications!";
    },
  },
  { method: "POST", path: "/user/create", handler: handlers.user.createUser },
  {
    method: "POST",
    path: "/user/login",
    handler: handlers.user.validateUserAndReturnToken,
  },
  {
    method: "POST",
    path: "/application/create",
    options: {
      auth: "jwt",
      validate: {
        payload: applicationSchema,
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
          update: applicationSchema,
        }),
      },
    },
    handler: handlers.application.updateApplication,
  },
];
