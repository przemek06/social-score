const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { validateUser, validatePesel, generateJwtToken } = require("../models/User.js");
const { encrypt, compare } = require("../utils/functions.js");
const { insertUser, selectUserByPesel } = require("../repo/user_repository.js");

router.post("/register", async (req, res) => {
  console.log("POST /auth/register", req.params, req.body, req.query);

  const { error, value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await selectUserByPesel(value.pesel);
  if (user.length > 0) return res.status(400).send("User already registered with that PESEL.");
  
  const passwordHash = await encrypt(value.password);

  const result = await insertUser({...value, password: passwordHash})

  return res.status(200).send(result[0]);
});

router.post("/login", async (req, res) => {
  console.log("POST /auth/login", req.params, req.body, req.query);

  const { error, value } = validatePesel(req.body.pesel);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await selectUserByPesel(value);
  if (user.length !== 1) return res.status(400).send("Invalid pesel or password.");
  const userData = user[0];

  const validPassword = await compare(req.body.password, userData.password);
  if (!validPassword) return res.status(400).send("Invalid pesel or password.");
  
  const token = generateJwtToken(userData.id, userData.pesel, userData.email, userData.name, userData.surname);

  res.setHeader('Set-Cookie', `token=${token}; Path=/`);
  return res.status(200).send(userData);
});

module.exports = router;