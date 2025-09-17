const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const reviewController = require("../controllers/reviewController");

router.post("/", restaurantController.createRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:restaurantId", restaurantController.getRestaurantById);
router.put("/:restaurantId", restaurantController.updateRestaurant);

router.post("/:restaurantId/review", reviewController.createReview);
router.get("/:restaurantId/review", reviewController.getReview);

module.exports = router;
