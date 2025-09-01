const express = require("express");
const fs = require("fs");
const app = express();

const port = 3000;

app.use(express.json());

const readData = () => {
  const data = fs.readFileSync("db.json");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

app.post("/dishes", (req, res) => {
  const dishesData = readData();
  const newDish = { id: Date.now(), ...req.body };
  dishesData.dishes.push(newDish);
  writeData(dishesData);
  res.status(201).json(newDish);
});

app.get("/dishes", (req, res) => {
  const dishesData = readData();
  res.json(dishesData.dishes);
});

app.get("/dishes/:id", (req, res) => {
  const dishesData = readData();
  const dish = dishesData.dishes.find((d) => d.id == req.params.id);
  dish ? res.json(dish) : res.status(404).json({ error: "Dish not found" });
});

app.put("/dishes/:id", (req, res) => {
  const dishesData = readData();
  const dishIndex = dishesData.dishes.findIndex((d) => d.id == req.params.id);

  if (dishIndex === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  dishesData.dishes[dishIndex] = {
    ...dishesData.dishes[dishIndex],
    ...req.body,
  };

  writeData(dishesData);
  res.json(dishesData.dishes[dishIndex]);
});

app.delete("/dishes/:id", (req, res) => {
  const dishesData = readData();
  const updatedDishes = dishesData.dishes.filter((d) => d.id != req.params.id);

  if (updatedDishes.length === dishesData.dishes.length) {
    return res.status(404).json({ error: "Dish not found" });
  }

  dishesData.dishes = updatedDishes;
  writeData(dishesData);
  res.json({ message: "Dish deleted successfully" });
});

app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  const dishesData = readData();

  if (!name) {
    return res.status(400).json({ error: "Please provide a dish name" });
  }

  const results = dishesData.dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  results.length > 0
    ? res.json(results)
    : res.json({ message: "No dishes found" });
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
