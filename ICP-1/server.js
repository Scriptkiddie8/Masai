const express = require("express");
const app = express();

let obj = {
  1: {
    id: 1,
    name: kartik,
    company: masai,
  },
};

function Middleware(req, res, next) {
  let data = req.params(id);
  if (!data) {
    return res.status(404).json({ msg: "Something went wrong" });
  }
  next();
}

app.use("api/product/:id", Middleware);

app.listen(3000, () => {
  console.log("Server running...");
});
