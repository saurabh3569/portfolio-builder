const redis = require("../config/redis");
const ApiError = require("../utils/ApiError");
const { status } = require("http-status");

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
        throw new ApiError(
          status.TOO_MANY_REQUESTS,
          "Too many requests. Please try again later."
        );
      }

      next();
    } catch (error) {
      console.error("Redis Error:", error);
      return next(error);
    }
  };
};

module.exports = rateLimiter;
