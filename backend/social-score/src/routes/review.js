const express = require("express");
const router = express.Router();

const { validatePesel } = require("../models/User.js");
const { validateReview } = require("../models/Review.js");
const { decodeJwtToken } = require("../utils/functions.js");
const { selectUserByPesel } = require("../repo/user_repository.js");
const { insertReview, getReviewBySubject, getReviews } = require("../repo/review_repository.js");

const { call } = require("../utils/call.js");

router.post("/", async (req, res) => {
  console.log("POST /review", req.params, req.body, req.query);

  await call(async () => {
    if (!req.cookies || !req.cookies.token) return res.status(400).send("Please log in first.");

    let userData;
    try {
      userData = decodeJwtToken(req.cookies.token);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Cannot decode token.");
    }

    const { error, value } = validateReview({...req.body, author: userData.pesel});
    if (error) return res.status(400).send(error.details[0].message);

    const target = await selectUserByPesel(value.subject);
    if (target.length === 0) return res.status(400).send("That user does not exist");

    const reviews = await getReviewBySubject(value.subject);
    const filtered = reviews.filter(r => r.author === userData.pesel);

    if (filtered.length !== 0) return res.status(400).send("You've already added review for this subject.");

    const result = await insertReview(value);

    return res.status(200).send(result[0]);
  }, res);
});

router.get("/:subject", async (req, res) => {
  console.log("GET /review/:subject", req.params, req.body, req.query);

  await call(async () => {
    const { error, value } = validatePesel(req.params.subject);
    if (error) return res.status(400).send(error.details[0].message);

    const reviews = await getReviewBySubject(value);

    return res.status(200).send(reviews);
  }, res);
});

router.get("/", async (req, res) => {
  console.log("GET /review", req.params, req.body, req.query);

  await call(async () => {
    const reviews = await getReviews();

    return res.status(200).send(reviews);
  }, res);
});

module.exports = router;