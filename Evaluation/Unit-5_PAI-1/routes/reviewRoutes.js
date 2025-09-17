const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.delete("/review/:reviewId", reviewController.deleteReview);
module.exports = router;
