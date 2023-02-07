const express = require("express");
const router = express.Router();
const loginRoute = require("./login");
const registerRoute = require("./register");

router.use(loginRoute);
router.use(registerRoute);
module.exports = router;
