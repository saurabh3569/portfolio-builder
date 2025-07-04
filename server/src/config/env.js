require("dotenv").config();
const { cleanEnv, str, port, num, bool } = require("envalid");

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_URL: str({ default: "mongodb://localhost:27017/portfolio" }),
  JWT_SECRET: str(),
  JWT_ACCESS_EXPIRATION_MINUTES: num({ default: 300 }),
  JWT_REFRESH_EXPIRATION_DAYS: num({ default: 30 }),
  REDIS_HOST: str({ default: "127.0.0.1" }),
  REDIS_PORT: num({ default: 6379 }),
  NODE_MAILER_GMAIL: str(),
  NODE_MAILER_PASS: str(),
  RABBITMQ_URL: str({ default: "amqp://localhost:5672" }),
  DOCKER_ENV: bool({ default: false }),
  REDIS_HOST_DOCKER: str({ default: "redis" }),
  REDIS_URL: str({ default: undefined }),
});

module.exports = { env };
