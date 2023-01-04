const { Application } = require("../models");
const boom = require("boom");

// create reports cause why not
const getJobApplicationReport = async (req, h) => {
  const start = new Date(req.params.startDate);
  const end = new Date(req.params.endDate);
  try {
    const applications = await Application.find({
      dateApplied: { $gte: start, $lt: end },
    });
    // 'Applied', 'In Process', 'Rejected', 'Received Offer'
    const total = applications.length;
    let rejectedCount = 0;
    let inProcessCount = 0;

    applications.forEach((app) => {
      if (app.status === "Rejected") {
        rejectedCount++;
      }
      if (app.status === "In Process") {
        inProcessCount++;
      }
    });
    return {
      total,
      rejectedCount,
      inProcessCount,
    };
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};

exports.getJobApplicationReport = getJobApplicationReport;
