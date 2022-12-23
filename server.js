"use strict";

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const secret = require("./config");
const { validate } = require("./handlers/util");

const url = "mongodb://127.0.0.1:27017/application-log";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  require("./models");
  await server.register(Jwt);
  server.auth.strategy("jwt", "jwt", {
    keys: { key: secret, algorithms: ["HS256"] },
    verify: { aud: false, iss: false, sub: false, exp: true },
    validate: false,
  });
  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.error(err));
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
