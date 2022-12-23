const handlers = require("../handlers");

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
    method: "GET",
    path: "/user/test",
    options: {
      auth: "jwt",
    },
    handler: function (request, h) {
      return "it worked";
    },
  },
];
