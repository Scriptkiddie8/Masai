//import

const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  //req : send by the client
  //res : given by the app
  //how to give the res??

  res.send("This is the test route");
});

app.get("/home", (req, res) => {
  res.send("This is home route");
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
