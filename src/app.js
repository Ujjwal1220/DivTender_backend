const express = require("express");

const app = express();
const { connectdb } = require("./database");

connectdb()
  .then(() => {
    console.log("connected successfully");
    app.listen(7777, () => {
      console.log("Hey! Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("disconnected");
  });
// Start the server on port 7777
