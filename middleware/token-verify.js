const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const verify = (req, res, next) => {
  //check for token
  if (!req.header("Authorization") && !req.cookies.token) {
    return res.status(403).send({ msg: "Token is missing" });
  }

  //fetch the token remove the bearer from header
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer", "");

  try {
    const verifyToken = jwt.verify(token.trim(), process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    return res.status(403).send({ msg: "UnAuthorized!!" });
  }
  next();
};

module.exports = verify;
