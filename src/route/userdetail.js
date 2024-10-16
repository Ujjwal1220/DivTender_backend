const express = require("express");
const User = require("../models/user");
const userrouter = express.Router();
const { authentication } = require("../middlewares/Middleware");
const ConnectionRequest = require("../models/connectionrequest");

userrouter.get("/user/request/received", authentication, async (req, res) => {
  try {
    const loggin = req.user;
    const access = await ConnectionRequest.find({
      _id: loggin._id,
      status: "interested",
    }).populate("fromUserId", ["FirstName , LastName"]);
    res.json({ message: "ok", data: access });
  } catch (err) {
    res.status(400).send("Check again request api , something went wrong");
  }
});

userrouter.get("/user/connections", authentication, async (req, res) => {
  try {
    const loginuser = req.user;

    const seeconnection = await ConnectionRequest.find({
      $or: [
        { fromUserId: loginuser._id, status: "accepted" },
        { toUserId: loginuser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["FirstName", "LastName"])
      .populate("toUserId", ["FirstName", "LastName"]);

    const data = seeconnection.map((key) => {
      if (key.fromUserId._id.toString() === loginuser._id.toString()) {
        return key.toUserId;
      }
      return key.fromUserId;
    });
    res.json({ data: data });
  } catch (err) {
    res.json({
      message: "Something wrong",
      data: err.message,
    });
  }
});

userrouter.get("/feed", authentication, async (req, res) => {
  const login = req.user;

  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;

  const findconnection = await ConnectionRequest.find({
    $or: [{ toUserId: login._id }, { fromUserId: login._id }],
  }).select("fromUserId toUserId");

  const mutualfriend = new Set();
  findconnection.forEach((req) => {
    mutualfriend.add(req.fromUserId.toString());
    mutualfriend.add(req.toUserId.toString());
  });

  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(mutualfriend) } }, //notin=nin.
      { _id: { $ne: login._id } }, //ne=not equal.
    ],
  })
    .select("FirstName LastName")
    .skip(skip)
    .limit(limit);

  res.json([
    {
      data: users,
    },
  ]);
});
module.exports = userrouter;
