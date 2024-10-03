const express = require("express");

const app = express(); //it will create the instance of express.,important line .

app.use(
  "/user",
  (req, res, next) => {
    console.log("1st response");
    // res.send("1st Response");
    next();
  },
  (req, res, next) => {
    console.log("2nd response");
    // res.send("2nd response");
    next();
  },
  (req, res, next) => {
    console.log("3rd response");
    // res.send("3rd response");
    next();
  },
  (req, res, next) => {
    console.log("4th response");
    res.send("4th response");
  }
);

app.listen(7777, () => {
  console.log("Hey!");
}); // it can also take callback function.
