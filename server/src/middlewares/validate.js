const { status } = require("http-status");
const ApiError = require("../utils/ApiError");

module.exports = (validation) => (req, res, next) => {
  const { error } = validation.body.validate(req.body);

  if (error) {
    throw new ApiError(status.BAD_REQUEST, error.details[0].message);
  }
  next();
};
