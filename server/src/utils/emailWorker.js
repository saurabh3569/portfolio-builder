const { connectQueue, consumeQueue } = require("./rabbitmq");
const sendEmail = require("./sendEmail");

(async () => {
  await connectQueue();
  consumeQueue(async (data) => {
    try {
      await sendEmail(data);
      console.log("✅ Email sent to:", data.to);
    } catch (err) {
      console.error("❌ Email failed for:", data.to, err);
    }
  });
})();
