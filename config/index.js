module.exports = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || "your-default-secret-key",
  mongoURI: process.env.MONGODB_URI,
};
