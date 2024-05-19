const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();
// const formidable = require("formidable");
// const fs = require("fs");

router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phoneNo,
      password,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("userExist")
      return res.status(400).json({ message: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNo,
      password: hashedPassword,
    });

    const authtoken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    console.log("user",user)

    res.json({
      success: true,
      authtoken,
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      imageUrl: user.imageUrl,

    });


  } catch (err) {
    console.log("err",err)
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const authtoken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.json({
      success: true,
      authtoken,
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;