const Recipe = require("../models/Recipe");

exports.getItalianRecipes = async (req, res) => {
  const data = await Recipe.find({ cuisine: "Italian" });
  res.json(data);
};

exports.getQuickRecipes = async (req, res) => {
  const data = await Recipe.find({ prep_time: { $lt: 30 } });
  res.json(data);
};

exports.getExpensiveRecipes = async (req, res) => {
  const data = await Recipe.find({ price: { $gt: 500 } });
  res.json(data);
};

exports.getRecipesSortedByPrice = async (req, res) => {
  const data = await Recipe.find().sort({ price: 1 });
  res.json(data);
};

exports.updateBiryaniPrice = async (req, res) => {
  const data = await Recipe.updateOne(
    { recipe_id: 2 },
    { $set: { price: 900 } }
  );
  res.json(data);
};
