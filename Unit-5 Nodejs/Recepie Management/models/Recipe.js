const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipe_id: Number,
  name: String,
  ingredients: [String],
  cuisine: String,
  prep_time: Number,
  difficulty: String,
  price: Number,
});

module.exports = mongoose.model("Recipe", recipeSchema);
