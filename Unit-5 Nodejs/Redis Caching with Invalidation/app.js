const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await client.connect();
})();

let database = [
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" },
];

const CACHE_KEY = "items";

app.get("/items", async (req, res) => {
  try {
    const cachedData = await client.get(CACHE_KEY);

    if (cachedData) {
      console.log("Returning data from Redis cache");
      return res.json(JSON.parse(cachedData));
    }

    console.log("Fetching from DB and caching");
    await client.setEx(CACHE_KEY, 60, JSON.stringify(database));
    res.json(database);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/items", async (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  database.push(newItem);
  await client.del(CACHE_KEY);
  res.status(201).json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let item = database.find((i) => i.id == id);
  if (!item) return res.status(404).send("Item not found");

  item.name = name;
  await client.del(CACHE_KEY);
  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  database = database.filter((i) => i.id != id);
  await client.del(CACHE_KEY);
  res.send("Item deleted");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
