const express = require("express");
const requestrouter = express.Router();

requestrouter.post("/request", async (req, res) => {
  res.send("request send");
});

module.exports = { requestrouter };
