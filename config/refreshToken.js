const jwt = require("jsonwebtoken");

const refreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

module.exports = { refreshToken };
