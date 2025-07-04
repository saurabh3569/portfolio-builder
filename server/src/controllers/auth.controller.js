const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Portfolio = require("../models/portfolio.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const { env } = require("../config/env");

const register = async (req, res) => {
  const { email, phone, username } = req.body;

  if (await User.exists({ email })) {
    throw new ApiError(
      status.BAD_REQUEST,
      "User with this email already exists"
    );
  }

  if (phone && (await User.exists({ phone }))) {
    throw new ApiError(
      status.BAD_REQUEST,
      "User with this phone already exists"
    );
  }

  if (await User.exists({ username })) {
    throw new ApiError(
      status.BAD_REQUEST,
      "User with this username already exists"
    );
  }

  req.body.password = await bcrypt.hash(req.body.password, 8);

  const user = new User(req.body);

  const portfolio = new Portfolio({ user: user._id });
  user.portfolio = portfolio._id;
  await user.save();
  await portfolio.save();

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: `${env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.send({ user: userObj, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(status.BAD_REQUEST, "Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: `${env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  const userObj = user.toObject();

  delete userObj.password;

  res.send({ user: userObj, token });
};

module.exports = { register, login };
