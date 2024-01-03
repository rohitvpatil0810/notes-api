const basicAuth = require("express-basic-auth");
const { secretKey } = require("../../config");

const users = {
  admin: secretKey,
};

console.log(users);

const basicAuthMiddleware = basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: "Unauthorized",
});

module.exports = basicAuthMiddleware;
