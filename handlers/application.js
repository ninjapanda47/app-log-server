const { Application } = require("../models");
const boom = require("boom");

// handlers for add, update and delete applications
const getApplications = async (req, h) => {
  try {
    const applications = await Application.find({});
    return {
      applications,
    };
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};

const addApplication = async (req, h) => {
  let application = new Application(req.payload);
  try {
    const newApplication = await application.save();
    return { success: true, newApplication };
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};
const updateApplication = async (req, h) => {
  try {
    await Application.findOneAndUpdate(
      { _id: req.params.id },
      req.payload.update
    );
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};
const removeApplication = async (req, h) => {
  // probably don't need this
};

exports.addApplication = addApplication;
exports.updateApplication = updateApplication;
exports.getApplications = getApplications;
