const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config");
const boom = require("boom");

const createToken = async (user) => {
  return jwt.sign({ id: user._id, email: user.email }, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

// add check for existing user

const createUser = async (req, h) => {
  const saltRounds = 10;
  let user = new User();
  user.email = req.payload.email;
  user.username = req.payload.username;
  let newUser;
  try {
    user.passwordHash = await bcrypt.hashSync(req.payload.password, saltRounds);
    newUser = await user.save();
    if (newUser) {
      const token = await createToken(newUser);
      return { id_token: token };
    }
  } catch (error) {
    console.log(error);
    throw boom.badRequest(error);
  }
};

const validateUserAndReturnToken = async (req, h) => {
  const user = await User.findOne({
    $or: [{ email: req.payload.username }, { username: req.payload.username }],
  });
  if (user) {
    const match = await bcrypt.compare(req.payload.password, user.passwordHash);
    if (match) {
      const token = await createToken(match);
      return { id_token: token };
    } else {
      throw boom.notAcceptable("Username and password did not match.");
    }
  } else {
    throw boom.notAcceptable("Username or email was not found.");
  }
};

exports.createUser = createUser;
exports.validateUserAndReturnToken = validateUserAndReturnToken;
