const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const jwt = require("jsonwebtoken");

const LoginGuard = async (req, res, next) => {
  try {
    // JWT Token Verify
    const tokenVerify = jwt.verify(req.cookies?.jwt, process.env.JWT_SECRET);
    // Find The user and get only email
    const findUser = await Users.findOne(
      { email: tokenVerify?.email },
      { email: 1 }
    );
    if (findUser) {
      res.locals.email = findUser.email;
    } else {
      res.locals.email = undefined;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = LoginGuard;
