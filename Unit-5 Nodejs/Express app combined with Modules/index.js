const express = require("express");
const os = require("os");
const dns = require("dns");
const readFileContent = require("./read");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileContent();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/systemdetails", (req, res) => {
  const details = {
    platform: os.platform(),
    totalMemoryGB: (os.totalmem() / 1024 ** 3).toFixed(2),
    freeMemoryGB: (os.freemem() / 1024 ** 3).toFixed(2),
    cpuModel: os.cpus()[0].model,
  };
  res.json(details);
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", (err, address) => {
    if (err) {
      res.status(500).send("DNS lookup failed");
    } else {
      res.send(`IP address of masaischool.com is: ${address}`);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
