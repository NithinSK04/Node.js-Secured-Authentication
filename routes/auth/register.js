const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//schemas
const User = require("../../models/user");

//Routes
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  if (!(firstname && lastname && email && password)) {
    res.status(422).json({ msg: "Please fill the mandatory details" });
  } else {
    try {
      const exists = await User.findOne({ email });
      if (exists) {
        res.status(422).json({ message: "User already registered" });
      } else {
        //hash the password and save it in db
        const encryptPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstname,
          lastname,
          email,
          password: encryptPassword,
          role: role || 'user', // Default role to 'user' if not provided
        });

        //sign a JWT token and send it back to the client
        const token = jwt.sign(
          {
            user_id: user._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2h" }
        );

        // Do not send password to the client
        user.password = undefined;
        res.status(200).json({ user, token: token });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
      console.log(error);
    }
  }
});

module.exports = router;