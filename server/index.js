const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DbConnection = require("./DbConnection");


dotenv.config();

const app = express();

DbConnection();

// Configure CORS to prevent axios error
app.use(cors({
  origin: "https://mern-form-azure.vercel.app/",  // Allow frontend URL
  credentials: true,  // Allow credentials (cookies, sessions, etc.)
  methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allow headers
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
const userRouter = require("./router/userRouter");
app.use("/users", userRouter);

// Verification endpoint
app.post('/users/verify', (req, res) => {
  // Your verification logic here
  res.json({ status: 200, data: 'new-token' });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT - ${PORT}`);
});

