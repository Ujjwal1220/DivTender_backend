const express = require("express");
const profilerouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { auth } = require("../middlewares/Middleware");
const { validateeditprofiledata } = require("../utilis/validation");
profilerouter.get("/profile/view", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profilerouter.patch("/profile/edit", auth, async (req, res) => {
  try {
    if (!validateeditprofiledata(req)) {
      throw new Error("Invalid field");
    }
    const loggedinuser = req.user;
    Object.keys(req.body.forEach((key) => (loggedinuser[key] = req.body[key])));
    loggedinuser.save();
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

module.exports = { profilerouter };
