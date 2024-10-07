const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://Practice:pFEKHZ6tIMDBlumQ@practice.pjx3b.mongodb.net/"
  );
};

connectdb()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.error("disconnected");
  });
