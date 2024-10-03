const express = require("express");

const app = express(); //it will create the instance of express.,important line .

app.get("/ab?c", (req, res) => {
  res.send("Home Sweet Home");
});

app.listen(7777, () => {
  console.log("Hey!");
}); // it can also take callback function.
