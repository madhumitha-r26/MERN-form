const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DbConnection = require("./DbConnection");

dotenv.config();

const app = express();

DbConnection();

//  Configure CORS Properly
app.use(cors({
  origin: "https://mern-form-azure.vercel.app",  // Allow only your frontend URL
  credentials: true,  // ✅ Required for cookies/sessions to work
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

//  Middleware
app.use(cookieParser());
app.use(express.json());

// Handle Preflight Requests Correctly
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mern-form-azure.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No content for preflight
  }
  next();
});

//  Routes
const userRouter = require("./router/userRouter");
app.use("/users", userRouter);

//  Verification Endpoint (If Needed)
app.post('/users/verify', (req, res) => {
  res.json({ status: 200, data: 'new-token' });
});

//  Root API Endpoint
app.get("/", (req, res) => {
  res.send("WELCOME TO MERN FORM API");
});

//  Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT - ${PORT}`);
});
