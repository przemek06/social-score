const express = require("express");
const router = express.Router();

const { decodeJwtToken } = require("../utils/functions.js");
const { validatePesel } = require("../models/User.js");
const { validateMap } = require("../models/Map.js");

const { call } = require("../utils/call.js");

const globalMap = {};

router.post("/", async (req, res) => {
  console.log("POST /map", req.params, req.body, req.query);

  await call(async () => {
    if (!req.cookies || !req.cookies.token) return res.status(400).send("Please log in first.");

    let userData;
    try {
      userData = decodeJwtToken(req.cookies.token);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Cannot decode token.");
    }

    const { error, value: pesel } = validatePesel(userData.pesel);
    if (error) return res.status(400).send(error.details[0].message);

    const { error2, value } = validateMap(req.body);
    if (error2) return res.status(400).send(error2.details[0].message);

    globalMap[pesel] = value;

    return res.status(200).send(value);
  }, res);
});

router.get("/", async (req, res) => {
  console.log("GET /map", req.params, req.body, req.query);

  await call(async () => {
    if (!req.cookies || !req.cookies.token) return res.status(400).send("Please log in first.");

    let userData;
    try {
      userData = decodeJwtToken(req.cookies.token);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Cannot decode token.");
    }

    const { error, value: pesel } = validatePesel(userData.pesel);
    if (error) return res.status(400).send(error.details[0].message);

    if (!globalMap[pesel]) return res.status(400).send("No map entries found.");

    return res.status(200).send(globalMap[pesel]);
  }, res);
});

router.get("/all", async (req, res) => {
  console.log("GET /map/all", req.params, req.body, req.query);

  await call(async () => {
    return res.status(200).send(globalMap);
  }, res);
});

module.exports = router;