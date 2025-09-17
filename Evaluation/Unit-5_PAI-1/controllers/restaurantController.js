const Restaurant = require("../models/restaurantModel");

exports.createRestaurant = async (req, res) => {
  const { name, cuisine, address } = req.body;
  const restaurant = await Restaurant.create({ name, cuisine, address });
  res.status(201).json(restaurant);
};

exports.getAllRestaurants = async (req, res) => {
  const filter = req.query.cuisine ? { cuisine: req.query.cuisine } : {};
  const restaurant = await Restaurant.find(filter);
  res.json(restaurant);
};

exports.getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ msg: "Restaurant Not Found..." });
  }
  res.json(restaurant);
};

exports.updateRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.restaurantId,
    req.body,
    { new: true }
  );
  if (!restaurant) {
    return res.status(404).json({ msg: "Restaurant Not Found" });
  }
  res.json(restaurant);
};
