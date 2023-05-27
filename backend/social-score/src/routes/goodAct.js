const express = require("express");
const router = express.Router();

const { validateGoodAct } = require("../models/GoodAct.js");
const { insertGoodAct } = require("../repo/good_acts_repository.js");
const { selectUserByPesel } = require("../repo/user_repository.js");

const { call } = require("../utils/call.js");

router.post("/", async (req, res) => {
  console.log("POST /goodAct", req.params, req.body, req.query);

  await call(async () => {
    const { error, value } = validateGoodAct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const target = await selectUserByPesel(value.subject);
    if (target.length === 0) return res.status(400).send("That user does not exist");

    const result = await insertGoodAct(value);

    return res.status(200).send(result[0]);
  }, res);
});

module.exports = router;