require("dotenv").config();
const amqplib = require("amqplib");
const ApiError = require("./ApiError");
const { status } = require("http-status");
const { env } = require("../config/env");

let channel, connection;

const connectQueue = async () => {
  try {
    connection = await amqplib.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("email-queue");
    console.log("RabbitMQ Connected and Channel Ready");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

const sendToQueue = async (data) => {
  if (!channel) {
    throw new ApiError(
      status.BAD_REQUEST,
      "RabbitMQ channel not initialized. Call connectQueue() first."
    );
  }
  channel.sendToQueue("email-queue", Buffer.from(JSON.stringify(data)));
};

const consumeQueue = (callback) => {
  if (!channel) {
    throw new ApiError(
      status.BAD_REQUEST,
      "RabbitMQ channel not initialized. Call connectQueue() first."
    );
  }

  channel.consume("email-queue", async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      await callback(content);
      channel.ack(msg);
    }
  });
};

module.exports = { connectQueue, sendToQueue, consumeQueue };
