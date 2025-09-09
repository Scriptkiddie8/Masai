const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Recipe = require("./models/Recipe");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/recipesdb")
  .then(() => console.log("MongoDB Connected"));

app.get("/seed", async (req, res) => {
  await Recipe.deleteMany({});
  const recipes = JSON.parse(fs.readFileSync("./data/recipes.json", "utf8"));
  await Recipe.insertMany(recipes);
  res.send("Recipes inserted");
});

app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
