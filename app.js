const express = require("express");
const { port } = require("./config");
const connectToDatabase = require("./config/mongoConfig");

const app = express();

// connect to MongoDB
connectToDatabase();

// Middlewares
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
