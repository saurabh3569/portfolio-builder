const { status } = require("http-status");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      status.INTERNAL_SERVER_ERROR,
      error.message || "Internal server error"
    );
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode || 400).send({ code: statusCode, message });
};

module.exports = { errorConverter, errorHandler };
