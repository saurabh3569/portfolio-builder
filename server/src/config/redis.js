const Redis = require("ioredis");

let redis;

if (process.env.REDIS_URL) {
  //  Using Render Redis (Cloud)
  redis = new Redis(process.env.REDIS_URL, {
    tls: {},
  });
} else {
  // Using Local Redis
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
}

redis.on("connect", () => console.log("Redis Connected!"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
