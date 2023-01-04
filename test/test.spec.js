"use strict";
const sinon = require("sinon");
const assert = require("assert");
const expect = require("chai").expect;
const { init } = require("../server");
const { createToken } = require("../handlers/user");
const { Application } = require("../models");

describe("Route Handler Tests", () => {
  let server;
  let token;

  before(async () => {
    token = await createToken({
      _id: "testuserid",
      email: "joeygau@gmail.com",
    });
    server = await init();
  });

  beforeEach(() => {
    sinon.restore();
  });

  after(async () => {
    await server.stop();
    sinon.restore();
  });

  it("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
  });

  it("responds with all applications", async () => {
    const findStub = sinon.stub(Application, "find").resolves([]);
    const res = await server.inject({
      method: "get",
      url: "/application/12-01-2022/03-01-2023",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    expect(findStub.calledOnce).to.equal(true);
    expect(res.statusCode).to.equal(200);
    expect(res.result.applications).to.deep.equal([]);
  });

  it("responds with the new application created", async () => {
    const newApp = {
      _id: "newidmade",
      userId: "test-user",
      companyName: "Awesome Company",
      jobTitle: "Software Engineer",
    };
    const saveStub = sinon.stub(Application.prototype, "save").resolves(newApp);
    const res = await server.inject({
      method: "post",
      url: "/application/create",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        userId: newApp.userId,
        companyName: newApp.companyName,
        jobTitle: newApp.jobTitle,
      },
    });
    expect(saveStub.calledOnce).to.equal(true);
    expect(res.statusCode).to.equal(200);
    expect(res.result.success).to.equal(true);
    expect(res.result.newApplication).to.deep.equal(newApp);
  });

  it("responds with success true when update is successful", async () => {
    const updatedApp = {
      _id: "12345",
      userId: "test-user",
      companyName: "Awesome Company",
      jobTitle: "Software Engineer",
    };
    const updateStub = sinon
      .stub(Application, "findOneAndUpdate")
      .resolves(updatedApp);
    const res = await server.inject({
      method: "put",
      url: "/application/12345",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        update: {
          status: "in-process",
          notes: "I'm making progress.",
        },
      },
    });
    expect(updateStub.calledOnce).to.equal(true);
    expect(res.statusCode).to.equal(200);
    expect(res.result.success).to.equal(true);
  });

  it("responds with status code 400 when payload input is invalid", async () => {
    const res = await server.inject({
      method: "put",
      url: "/application/12345",
      headers: {
        Authorization: "Bearer " + token,
      },
      payload: {
        update: {
          status: "in-process",
          wrongField: "Tell me what you hate about me.",
        },
      },
    });
    expect(res.statusCode).to.equal(400);
  });

  it("responds with status code 401 when wrong token is provided", async () => {
    const res = await server.inject({
      method: "put",
      url: "/application/12345",
      headers: {
        Authorization: "Bearer " + "imafaketoken",
      },
      payload: {
        update: {
          status: "in-process",
          notes: "Whatever it is, I'm sorry",
        },
      },
    });
    expect(res.statusCode).to.equal(401);
  });

  it("responds with report data", async () => {
    const app1 = { status: "Applied" };
    const app2 = { status: "In Process" };
    const app3 = { status: "Rejected" };
    const findStub = sinon
      .stub(Application, "find")
      .resolves([app1, app2, app3]);
    const res = await server.inject({
      method: "get",
      url: "/report/12-01-2022/03-01-2023",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    expect(findStub.calledOnce).to.equal(true);
    expect(res.statusCode).to.equal(200);
    expect(res.result.total).to.equal(3);
    expect(res.result.rejectedCount).to.equal(1);
    expect(res.result.inProcessCount).to.equal(1);
  });
});
