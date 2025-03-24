const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Portfolio = require("../models/portfolio.model");

const register = async (req, res) => {
  const { email, phone, username } = req.body;

  if (await User.exists({ email })) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  if (await User.exists({ phone })) {
    return res
      .status(400)
      .json({ message: "User with this phone already exists" });
  }

  if (await User.exists({ username })) {
    return res
      .status(400)
      .json({ message: "User with this username already exists" });
  }

  req.body.password = await bcrypt.hash(req.body.password, 8);

  const user = new User(req.body);

  const portfolio = new Portfolio({ user: user._id });
  user.portfolio = portfolio._id;
  await user.save();
  await portfolio.save();

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.send({ user: userObj, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });

  const userObj = user.toObject();

  delete userObj.password;

  res.send({ user: userObj, token });
};

module.exports = { register, login };
