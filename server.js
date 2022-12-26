"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const routes = require("./routes/routes");

exports.init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  require("./models");
  await server.register(Jwt);
  server.auth.strategy("jwt", "jwt", {
    keys: { key: process.env.SECRET_KEY, algorithms: ["HS256"] },
    verify: { aud: false, iss: false, sub: false, exp: true },
    validate: false,
  });
  server.route(routes);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
