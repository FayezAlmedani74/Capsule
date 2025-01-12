const Joi = require("joi");

exports.validateCapsule = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),

    content: Joi.string().required(),

    releaseDate: Joi.date().greater("now").required(),

    imageUrl: Joi.string().uri().optional(),
  });

  return schema.validate(data);
};
