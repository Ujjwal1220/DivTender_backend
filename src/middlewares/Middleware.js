const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const resu = req.cookies;
    const { token } = resu;
    if (!token) {
      throw new Error("Token is not found");
    }
    const decodeddata = await jwt.verify(token, "UjjWal@123");
    const { _id } = decodemessage;
    const valid = await User.findById(_id);
    if (!valid) {
      throw new Error("User is not valid");
    }
    res.send(valid);
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
  }
};

module.exports = {
  auth,
};
