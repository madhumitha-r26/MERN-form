const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const userModel = require("../model/userModel");

dotenv.config();

// CORS Middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mern-form-azure.vercel.app");
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
      return res.status(400).json({ message: "User already exists!" });
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
      return res.status(400).json({ message: "No user exists!" });
    }

    const pwdMatch = await bcrypt.compare(password, existingUser.password);
    if (!pwdMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ email: existingUser.email }, process.env.KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ---------------------------- Verify ----------------------------
router.post("/verify", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const user = await userModel.findOne({ email: decoded.email });
    if (user) {
      res.json({ status: "ok", user });
    } else {
      res.json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// ---------------------------- Update ----------------------------
router.post("/update", async (req, res) => {
  const { email, name, password } = req.body;
  console.log("Update request received:", { email, name, password });
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name, password: hashedPwd },
      { new: true }
    );
    if (updatedUser) {
      res.json({ status: "ok", message: "User updated successfully", user: updatedUser });
    } else {
      res.json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});


// ---------------------------- Delete ----------------------------
router.post("/delete", async (req, res) => {
  const { email } = req.body;
  console.log("Delete request received:", { email });
  try {
    const deletedUser = await userModel.findOneAndDelete({ email });
    if (deletedUser) {
      res.json({ status: "ok", message: "User deleted successfully" });
    } else {
      res.json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
