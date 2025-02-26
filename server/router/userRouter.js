const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const userModel = require("../model/userModel");

dotenv.config();

// CORS Middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// ---------------------------- Register ----------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPwd });
    await newUser.save();

    return res.status(201).json({ message: "User registered!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ---------------------------- Login ----------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "No user exists!" });
    }

    const pwdMatch = await bcrypt.compare(password, existingUser.password);
    if (!pwdMatch) {
      return res.status(401).json({ success: false, message: "Password does not match" });
    }

    // Generate JWT Token
    const token = jwt.sign({ name: existingUser.name }, process.env.KEY, { expiresIn: "1h" });

    // Set Cookie Before Sending Response
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

