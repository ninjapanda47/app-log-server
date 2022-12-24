"use strict";
const { init } = require("./server");
const mongoose = require("mongoose");

async function start() {
  const url = "mongodb://127.0.0.1:27017/application-log";
  try {
    const server = await init();
    await server.start();
    console.log("Server running at:", server.info.uri);
    mongoose
      .connect(url, { useNewUrlParser: true })
      .then(() => console.log("MongoDB is connected"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
