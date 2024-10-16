const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const app = express();
const { connectdb } = require("./config/database");
const User = require("./models/user");
const { validationsignup } = require("./utilis/validation");
const { authrouter } = require("./route/auth");
const { profilerouter } = require("./route/profile");
const { requestrouter } = require("./route/request");
const userrouter = require("./route/userdetail");

app.use(express.json());
app.use(cookieparser());

app.use("/", authrouter);
app.use("/", profilerouter);
app.use("/", requestrouter);
app.use("/", userrouter);

app.get("/feed", async (req, res) => {
  const useremail = req.body.Email;

  try {
    const resu = await User.find({ Email: useremail });
    if (resu != 0) {
      res.send(resu);
    } else {
      res.send("user not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/getbyID", async (req, res) => {
  try {
    const resu = await User.findById("6704a4c4d756554351dfc4b9");
    res.send(resu);
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.delete("/remove", async (req, res) => {
  const userid = req.body.userid;
  try {
    const rese = await User.findOneAndDelete(userid);
    res.send(rese);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.patch("/update", async (req, res) => {
  const userid = req.body.userid;
  const data = req.body;
  try {
    const rest = await User.findByIdAndUpdate({ _id: userid }, data, {
      runValidators: true,
    });
    res.send(rest);
  } catch (err) {
    res.send("Something went wrong");
  }
});

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
