const Joi = require("joi");

const peselSchema = Joi.string().regex(/^[0-9]{11}$/, "pesel").required();
const nameSchema = Joi.string().min(1).max(50).required();
const surnameSchema = Joi.string().min(1).max(50).required();

const namesSchema = Joi.object({
  name: nameSchema,
  surname: surnameSchema
});

const schema = Joi.object({
  pesel: peselSchema,
  email: Joi.string().email().required(),
  name: nameSchema,
  surname: surnameSchema,

  password: Joi.string().min(8).required(),

  height: Joi.number().min(0).max(300).required(),
  weight: Joi.number().min(0).max(500).required(),

  // 0 - nic
  // 1 - podstawowe
  // 2 - liceum
  // 3 - licencjat
  // 4 - magister
  // 5 - doktor
  // 6 - profesor
  education: Joi.number().min(0).max(6).required(),

  address: Joi.string().min(2).max(200).required(),
  city: Joi.string().min(2).max(50).required(),
  zipCode: Joi.string().regex(/[0-9]{2}-[0-9]{3}/, "zip code").required(),
});

validatePesel = (pesel) => {
  return peselSchema.validate(pesel);
}

validateNames = (names) => {
  return namesSchema.validate(names);
}

validateUser = (user) => {
  return schema.validate(user);
}

module.exports = {
  schema,
  validateUser,
  validatePesel,
  validateNames
}