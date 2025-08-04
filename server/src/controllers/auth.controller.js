const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Portfolio, Sequelize } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const { env } = require("../config/env");

const register = async (req, res) => {
  const { email, phone, username, password, name, location } = req.body;

  const Op = Sequelize.Op;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }, ...(phone ? [{ phone }] : [])],
    },
  });

  if (existingUser) {
    if (existingUser.email === email)
      throw new ApiError(
        status.BAD_REQUEST,
        "User with this email already exists"
      );
    if (existingUser.username === username)
      throw new ApiError(
        status.BAD_REQUEST,
        "User with this username already exists"
      );
    if (phone && existingUser.phone === phone)
      throw new ApiError(
        status.BAD_REQUEST,
        "User with this phone already exists"
      );
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await User.create({
    email,
    phone,
    username,
    name,
    location,
    password: hashedPassword,
  });

  await Portfolio.create({ user_id: user.id });

  const userObj = user.toJSON();
  delete userObj.password;

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: `${env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  return res.json({ user: userObj, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(status.BAD_REQUEST, "Invalid credentials");
  }

  const userObj = user.toJSON();
  delete userObj.password;

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: `${env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  return res.json({ user: userObj, token });
};

module.exports = { register, login };
