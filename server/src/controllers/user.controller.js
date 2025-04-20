const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const redis = require("../config/redis");

const updateUser = async (req, res) => {
  const { email, phone, password, name, username, location } = req.body;
  const userId = req.user.id;

  if (email) {
    const emailExists = await User.exists({ email, _id: { $ne: userId } });
    if (emailExists) {
      throw new ApiError(status.BAD_REQUEST, "Email is already in use");
    }
  }

  if (phone) {
    const phoneExists = await User.exists({ phone, _id: { $ne: userId } });
    if (phoneExists) {
      throw new ApiError(status.BAD_REQUEST, "Phone number is already in use");
    }
  }

  if (username && username !== req.user.username) {
    const usernameExists = await User.exists({
      username,
      _id: { $ne: userId },
    });
    if (usernameExists) {
      throw new ApiError(status.BAD_REQUEST, "Username is already taken");
    }
    await redis.del(req.user.username);
  }

  let updateData = { email, phone, name, username, location };
  if (password) {
    updateData.password = await bcrypt.hash(password, 8);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.send({ user: updatedUser });
};

const deleteUser = async (req, res) => {
  const user = req.user;

  await user.deleteOne();
  await redis.del(req.user.username);

  res.send({ user });
};

module.exports = { updateUser, deleteUser };
