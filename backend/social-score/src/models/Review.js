const Joi = require("joi");
const jwt = require("jsonwebtoken");

const peselSchema = Joi.string().regex(/^[0-9]{11}$/, "pesel").required();
const { JWT_KEY } = require("../utils/config.js");

const schema = Joi.object({
  rating: Joi.number().integer().min(1).max(10).required(),
  description: Joi.string().min(1).max(2000).required(),
  subject: peselSchema,
  author: peselSchema
});

validateReview = (review) => {
  return schema.validate(review);
}

module.exports = {
  schema,
  validateReview
}