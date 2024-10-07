const express = require("express");

const app = express();
require("./database");
// Start the server on port 7777
app.listen(7777, () => {
  console.log("Hey! Server is running on port 7777");
});
