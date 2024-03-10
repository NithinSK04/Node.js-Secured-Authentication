const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//schema
const User = require("../../models/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(422).json({ msg: "Please enter the mandatory fields" });
  } else {
    try {
      //returns the current user
      const user = await User.findOne({ email });
      //if user is found check for password match else throw 404
      if (user) {
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          //generate token
          const token = jwt.sign(
            {
              user_id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
          );

          // http-only cookies
          //Step1: define the config
          const options = {
            expiresIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          };
          user.token = token;
          user.password = undefined;
          res.status(200).cookie("token", token, options).json(user);
        } else {
          res.clearCookie("token");
          res.status(401).json({ msg: "Unauthorized!!! password mismatch" });
        }
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ msg: "Access Denied, Something went wrong" });
      console.log(error);
    }
  }
});

module.exports = router;