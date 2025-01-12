const { ValidationError } = require("../../utils/errors");

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new ValidationError(errorMessage);
  }

  next();
};
