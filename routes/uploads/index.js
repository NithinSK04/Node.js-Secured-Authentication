const express = require("express");
const router = express.Router();
const profileUploads = require("./profile");

router.use(profileUploads);

module.exports = router;
