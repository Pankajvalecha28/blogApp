const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//Register

router.post("/register", async (req, res) => {
  try {
    // Check if the email provided is a valid email format using a regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json("Invalid email format");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      // User not found, return an error response
      return res.status(400).json("Wrong credentials!");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      // Password doesn't match, return an error response
      return res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
