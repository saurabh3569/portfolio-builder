const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const { email, phone, password, name, username, location } = req.body;
  const userId = req.user.id;

  if (email) {
    const emailExists = await User.exists({ email, _id: { $ne: userId } });
    if (emailExists)
      return res.status(400).json({ message: "Email is already in use" });
  }

  if (phone) {
    const phoneExists = await User.exists({ phone, _id: { $ne: userId } });
    if (phoneExists)
      return res
        .status(400)
        .json({ message: "Phone number is already in use" });
  }

  if (username) {
    const usernameExists = await User.exists({
      username,
      _id: { $ne: userId },
    });
    if (usernameExists)
      return res.status(400).json({ message: "Username is already taken" });
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

  res.send({ user });
};

module.exports = { updateUser, deleteUser };
