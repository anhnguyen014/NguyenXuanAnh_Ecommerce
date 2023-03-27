// const User = require("/");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const asyncHandle = require("express-async-handler");

const authMiddleware = asyncHandle(async (req, res, next) => {
  let token;
  if (req?.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again!");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandle(async (req, res, next) => {
  const { username } = req.user;
  const adminUser = await User.findOne({ username });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
