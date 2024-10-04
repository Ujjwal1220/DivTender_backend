const express = require("express");
const { auth } = require("./Middleware"); // Import the auth middleware

const app = express();

// Apply the auth middleware to all /admin routes
// app.use("/admin", auth);

// Protected routes under /admin
app.get("/admin/getAllData", auth, (req, res) => {
  res.send("All Data Sent");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("All data deleted");
});

// Start the server on port 7777
app.listen(7777, () => {
  console.log("Hey! Server is running on port 7777");
});
