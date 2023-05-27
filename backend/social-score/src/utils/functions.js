const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("./config.js");

module.exports = {
  encrypt: async (password) => await bcrypt.hash(password, 10),
  compare: async (password, hash) => await bcrypt.compare(password, hash),
  generateJwtToken: (id, pesel, email, name, surname) => {
    return jwt.sign(
      {
        id,
        pesel,
        email,
        name,
        surname
      },
      JWT_KEY
    );
  },
  decodeJwtToken: (token) => {
    return jwt.verify(token, JWT_KEY);
  }

};