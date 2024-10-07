const auth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = "xyz" === token;

  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Incorrect");
  }
};

module.exports = {
  auth,
};
