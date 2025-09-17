const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    restaurant: req.params.restaurantId,
  });
  res.status(201).json(review);
};

exports.getReview = async (req, res) => {
  const review = await Review.find({ restaurantId: req.params.restaurantId });
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return res.status(404).json({ msg: "Review Not Found" });
  }
  await review.remove();
  res.json({ msg: "Review Deleted" });
};
