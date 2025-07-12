const { User } = require("../models");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const redis = require("../config/redis");

const updateUser = async (req, res) => {
  const { email, phone, password, name, username, location } = req.body;
  const userId = req.user.id;

  const user = await User.findByPk(userId);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  if (email && email !== user.email) {
    const emailExists = await User.findOne({
      where: { email },
    });
    if (emailExists && emailExists.id !== userId) {
      throw new ApiError(status.BAD_REQUEST, "Email is already in use");
    }
  }

  if (phone && phone !== user.phone) {
    const phoneExists = await User.findOne({
      where: { phone },
    });
    if (phoneExists && phoneExists.id !== userId) {
      throw new ApiError(status.BAD_REQUEST, "Phone number is already in use");
    }
  }

  if (username && username !== user.username) {
    const usernameExists = await User.findOne({
      where: { username },
    });
    if (usernameExists && usernameExists.id !== userId) {
      throw new ApiError(status.BAD_REQUEST, "Username is already taken");
    }
    await redis.del(user.username); // clear old username from cache
  }

  const updateData = { email, phone, name, username, location };

  if (password) {
    updateData.password = await bcrypt.hash(password, 8);
  }

  await user.update(updateData);

  const updatedUser = user.toJSON();
  delete updatedUser.password;

  res.send({ user: updatedUser });
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  await redis.del(user.username);
  await user.destroy();

  const userObj = user.toJSON();
  delete userObj.password;

  res.send({ user: userObj });
};

module.exports = { updateUser, deleteUser };
