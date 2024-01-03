const express = require("express");
const { port } = require("./config");
const connectToDatabase = require("./config/mongoConfig");
const noteRoutes = require("./src/routes/noteRoutes");
const basicAuthMiddleware = require("./src/middleware/basicAuthMiddleware");

const app = express();

// connect to MongoDB
connectToDatabase();

// Middlewares
app.use(express.json());
app.use("/api", basicAuthMiddleware);

app.use("/api", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
