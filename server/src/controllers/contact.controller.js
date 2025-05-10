const Contact = require("../models/contact.model");
const Portfolio = require("../models/portfolio.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const sendEmail = require("../utils/sendEmail");

const getContact = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!contact) {
    throw new ApiError(status.NOT_FOUND, "Contact not found");
  }

  res.send(contact);
};

const listContact = async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });

  res.send(contacts);
};

const createContact = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  let contact = new Contact({ ...req.body, user: req.body.userId });

  await contact.save();

  await Portfolio.findByIdAndUpdate(
    contact.portfolio,
    {
      $push: { contacts: contact._id },
    },
    { new: true }
  );

  await sendEmail({
    subject: `new message from ${req.body.name}`,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    to: user.email,
  });

  res.send(contact);
};

const deleteContact = async (req, res) => {
  let contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!contact) {
    throw new ApiError(status.NOT_FOUND, "Contact not found");
  }

  await contact.deleteOne();

  res.send(contact);
};

module.exports = {
  getContact,
  listContact,
  createContact,
  deleteContact,
};
