const Redis = require("ioredis");
const { env } = require("./env");

let redis;

const redisHost = env.DOCKER_ENV ? env.REDIS_HOST_DOCKER : env.REDIS_HOST;

if (env.REDIS_URL) {
  //  Using Render Redis (Cloud)
  redis = new Redis(env.REDIS_URL, {
    tls: {},
  });
} else {
  // Using Local Redis
  redis = new Redis({
    host: redisHost,
    port: env.REDIS_PORT,
  });
}

redis.on("connect", () => console.log("Redis Connected!"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
