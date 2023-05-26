const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET /", req.params, req.body, req.query);

  return res.status(200).send("UP");
});

module.exports = router;