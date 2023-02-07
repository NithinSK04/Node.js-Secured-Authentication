const express = require("express");
const router = express.Router();
const tokenCheck = require("../../middleware/token-verify");

router.get("/", tokenCheck, (req, res) => {
  res.status(200).json({ msg: "Welcome to the dashboard page" });
});

module.exports = router;
