const express = require("express");

const app = express();

const port = 3000;

app.get("/home", (req, res) => {
  res.send("This is home Page");
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at Kartik@gmail.com");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
