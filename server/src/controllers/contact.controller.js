const { Contact, Portfolio, User } = require("../models");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");
const { sendToQueue } = require("../utils/rabbitmq");

const getContact = async (req, res) => {
  const contact = await Contact.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id,
    },
  });

  if (!contact) {
    throw new ApiError(status.NOT_FOUND, "Contact not found");
  }

  res.send(contact);
};

const listContact = async (req, res) => {
  const contacts = await Contact.findAll({
    where: {
      user_id: req.user.id,
    },
  });

  res.send(contacts);
};

const createContact = async (req, res) => {
  const user = await User.findByPk(req.body.userId);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const contact = await Contact.create({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
    user_id: req.body.userId,
    portfolio_id: req.body.portfolioId,
  });

  // Send to queue
  await sendToQueue({
    subject: `New message from ${req.body.name}`,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    to: user.email,
  });

  res.send(contact);
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id,
    },
  });

  if (!contact) {
    throw new ApiError(status.NOT_FOUND, "Contact not found");
  }

  await contact.destroy();

  res.send(contact);
};

module.exports = {
  getContact,
  listContact,
  createContact,
  deleteContact,
};
