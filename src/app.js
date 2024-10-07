const express = require("express");

const app = express();
const { connectdb } = require("./config/database");
const User = require("./models/user");

//create the instance of user using new keyword under an api, (like we are making instance of class in OOPS);

app.post("/signup", async (req, res) => {
  const userobj = new User({
    FirstName: "Ujjwal",
    LastName: "Mishra",
    Email: "mujjwal769@gmail.com",
    Age: "24",
    PhoneNo: "7876767656",
  });
  try {
    await userobj.save();
    res.send("data added suceesfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
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
// Start the server on port 7777
