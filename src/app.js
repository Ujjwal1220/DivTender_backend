const express = require("express");

const app = express(); //it will create the instance of express.,important line .

// app.use((req, res) => {
//   res.send("Hello from the server!"); // if we will run it on the server localhost:7777 , then it will gives the result , and also if we will type localhost:7000/home then also it will show us the same result, for handle this situation we will use router.
// });

// it is called request handlers

app.use("/home", (req, res) => {
  res.send("p ");
});

app.listen(7777, () => {
  console.log("Hey!");
}); // it can also take callback function.
