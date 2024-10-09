const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const app = express();
const { connectdb } = require("./config/database");
const User = require("./models/user");
const { validationsignup } = require("./utilis/validation");
//create the instance of user using new keyword under an api, (like we are making instance of class in OOPS);
app.use(express.json()); // it will convert json to js object.
app.use(cookieparser());
// post all the data to database
app.post("/signup", async (req, res) => {
  // const userobj = new User(req.body);
  try {
    validationsignup(req); //Step-1

    const { FirstName, LastName, Email, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    // Creating a new instance of the User model
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

app.post("/login", async (req, res) => {
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

app.get("/profile", async (req, res) => {
  try {
    const resu = req.cookies;
    const { token } = resu;

    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodemessage = await jwt.verify(token, "UjjWal@123");
    const { _id } = decodemessage;
    console.log(_id);

    const valid = await User.findById(_id);
    if (!valid) {
      throw new Error("User is not valid");
    }
    res.send(valid);
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
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

app.post("/sendrequest", async (req, res) => {
  res.send("request send");
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
