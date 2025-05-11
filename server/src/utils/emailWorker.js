const { connectQueue, consumeQueue } = require("./rabbitmq");
const sendEmail = require("./sendEmail");

const startEmailConsumer = async () => {
  await connectQueue();
  consumeQueue(sendEmail);
};

startEmailConsumer();
