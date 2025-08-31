const express = require("express");
const getFileInfo = require("./fileinfo");
const parseURL = require("./urlparser");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;
  if (!filepath) {
    return res.status(400).send("Missing 'filepath' query parameter.");
  }
  const info = getFileInfo(filepath);
  res.json(info);
});

app.get("/parseurl", (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("Missing 'url' query parameter.");
  }
  const parsed = parseURL(url);
  res.json(parsed);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
