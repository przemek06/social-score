const Joi = require("joi");

const schema = Joi.object({
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  district: Joi.string().min(1).max(200).required(),
});

validateMap = (map) => {
  return schema.validate(map);
}

module.exports = {
  schema,
  validateMap
}