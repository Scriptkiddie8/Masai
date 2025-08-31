const express = require("express");
const eventEmitter = require("./eventLogger");
const delayResponse = require("./delay");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/emit", (req, res) => {
  const { message } = req.query;
  if (!message) {
    return res.status(400).send("Missing 'message' query parameter.");
  }

  eventEmitter.emit("log", message);
  res.json({ status: "Message logged", message });
});

app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res
      .status(400)
      .send("Missing 'message' or 'time' query parameters.");
  }

  const delayMs = parseInt(time);

  try {
    const result = await delayResponse(message, delayMs);
    res.send(result);
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
