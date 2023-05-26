const express = require("express");
const router = express.Router();

const { call } = require("../start/call.js");

router.get("/", async (req, res) => {
  console.log("GET /", req.params, req.body, req.query);

  await call(async () => {
    return res.status(200).send("UP");
  }, res);
});

module.exports = router;