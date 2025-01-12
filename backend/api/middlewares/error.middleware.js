const logger = require("../../utils/logger");
const { AppError } = require("../../utils/errors");

exports.errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: Object.values(err.errors).map((e) => e.message),
    });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  // Default error
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
