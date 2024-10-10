const express = require("express");
const authrouter = express.Router();
const { validationsignup } = require("../utilis/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authrouter.post("/signup", async (req, res) => {
  try {
    validationsignup(req); //Step-1

    const { FirstName, LastName, Email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const userdata = new User({
      FirstName,
      LastName,
      Email,
      password: passwordHash,
    });
    await userdata.save();
    res.send("data added suceesfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const { Email, password } = req.body;

    // Fetch the user from the database
    const valid = await User.findOne({ Email: Email });
    if (!valid) {
      throw new Error("Email ID not present in DB");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, valid.password);
    if (isPasswordValid) {
      // create jwt token
      const token = await jwt.sign({ _id: valid._id }, "UjjWal@123", {
        expiresIn: "1d",
      });
      console.log(token);
      res.cookie("token", token);

      res.send("Login Successful!!!");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

authrouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});

module.exports = { authrouter };
