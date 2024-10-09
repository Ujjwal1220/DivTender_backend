const validator = require("validator");

const validationsignup = (req) => {
  const { FirstName, LastName, Email, password } = req.body;

  if (!FirstName || !LastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(Email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validationsignup,
};
