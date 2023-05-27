const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET /", req.params, req.body, req.query);

  return res.status(200).send("UP");
});

router.get("/predict", async (req, res) => {
  console.log("GET /predict", req.params, req.body, req.query);

  return res.status(200).send(Math.floor(Math.random() * 1000) + 1);
});

router.get("/districts", async (req, res) => {
  console.log("GET /predict", req.params, req.body, req.query);
  

  return res.status(200).send(Math.floor(Math.random() * 1000) + 1);
});

module.exports = router;