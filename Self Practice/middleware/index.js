const express = require("express");
const app = express();

const values = ["123", "546", "secret"];

function Middleware() {
  const apikey = req.header("x-api-key");
  if (!apikey) {
    return res.status(404).json({ msg: "Api key is missing" });
  }
  if (!values.includes(apikey)) {
    return res.status(404).json({ msg: "Invalid API Key" });
  }

  next();
}

app.use("/api/private", Middleware);
app.use("api/public", (req, res) => {
  res.json({ msg: "This is a public route" });
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
