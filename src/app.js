const express = require("express");

const app = express();
const { connectdb } = require("./config/database");
const User = require("./models/user");

//create the instance of user using new keyword under an api, (like we are making instance of class in OOPS);
app.use(express.json()); // it will convert json to js object.

// post all the data to database
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const userobj = new User(req.body);
  try {
    await userobj.save();
    res.send("data added suceesfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

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
