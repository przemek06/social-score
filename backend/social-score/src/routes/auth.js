const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { call } = require("../start/call.js");
const { validateUser, generateJwtToken } = require("../models/User.js");
const { encrypt, compare } = require("../utils/functions.js");

router.post("/register", async (req, res) => {
  console.log("GET /auth/register", req.params, req.body, req.query);

  await call(async () => {
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user is already registered by pesel and email

    const passwordHash = await encrypt(value.password);

    // Create user in database

    return res.status(200).send({
      userId: /* user id */
    });
  }, res);
});

router.post("/login", async (req, res) => {
  console.log("GET /auth/login", req.params, req.body, req.query);

  await call(async () => {

    // Find user in DB by pesel
    
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");
    
    const token = generateJwtToken(user.id, user.pesel, user.email, user.name, user.surname);
    return res.status(200).send({token});
  }, res);
});

module.exports = router;