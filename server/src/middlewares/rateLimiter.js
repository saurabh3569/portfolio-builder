const redis = require("../config/redis");

const rateLimiter = (limit, duration) => {
  return async (req, res, next) => {
    const userIP = req.ip;
    const redisKey = `rate_limit:${req.method}:${req.originalUrl}:${userIP}`;

    try {
      let requestCount = await redis.incr(redisKey);

      if (requestCount === 1) {
        await redis.expire(redisKey, duration); // duration in seconds
      }

      if (requestCount > limit) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      }

      next();
    } catch (error) {
      console.error("Redis Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = rateLimiter;
