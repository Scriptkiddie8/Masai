const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/library.routes");

const app = express();
app.use(express.json());

connectDB();
app.use("/library", libraryRoutes);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
