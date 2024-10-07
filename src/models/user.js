const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Age: {
    type: Number,
  },
  PhoneNo: {
    type: Number,
  },
});

// const user=mongoose.model("user",UserSchema);
// module.exports={
//   user,
// }

//BOTH ARE SAME

module.exports = mongoose.model("user", UserSchema);
