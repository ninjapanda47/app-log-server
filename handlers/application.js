const { Application } = require("../models");
const boom = require("boom");

// handlers for add, update and delete applications
const getApplications = async (req, h) => {
  try {
    const applications = await Application.find({ userId: req.params.userid });
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

// this is a hard delete, probably not applicable in real life, but I want to delete if I want
const removeApplications = async (req, h) => {
  try {
    const { deletedCount } = await Application.deleteMany({
      _id: { $in: req.payload.idsToRemove },
    });
    return {
      success: true,
      deletedCount,
    };
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};

exports.addApplication = addApplication;
exports.updateApplication = updateApplication;
exports.getApplications = getApplications;
exports.removeApplications = removeApplications;
