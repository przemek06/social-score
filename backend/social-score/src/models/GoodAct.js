const Joi = require("joi");

const peselSchema = Joi.string().regex(/^[0-9]{11}$/, "pesel").required();

const schema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  weight: Joi.number().integer().min(1).max(10).required(),
  subject: peselSchema,
});

validateGoodAct = (goodAct) => {
  return schema.validate(goodAct);
}

module.exports = {
  schema,
  validateGoodAct
}