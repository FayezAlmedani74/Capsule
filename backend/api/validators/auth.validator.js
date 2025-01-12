const Joi = require("joi");
const { ValidationError } = require("../../utils/errors");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "any.required": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

exports.validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new ValidationError(errorMessage);
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new ValidationError(errorMessage);
  }

  next();
};
