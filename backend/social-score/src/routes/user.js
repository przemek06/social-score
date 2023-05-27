const express = require("express");
const router = express.Router();

const { validateNames } = require("../models/User.js");
const { selectUserByFullName } = require("../repo/user_repository.js");

const { call } = require("../utils/call.js");

router.get("/:name/:surname", async (req, res) => {
  console.log("GET /user", req.params, req.body, req.query);

  await call(async () => {
    const { error, value } = validateNames(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await selectUserByFullName(value.name, value.surname);

    return res.status(200).send(user);
  }, res);
});

module.exports = router;