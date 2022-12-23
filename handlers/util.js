const { User } = require("../models");

const validate = async function (decoded, request, h) {
  console.log("decoded");
  const validUser = await User.findById(decoded.id);
  if (!validUser) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

exports.validate = validate;
