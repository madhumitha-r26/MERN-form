const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser=require("cookie-parser")

const DbConnection=require("./DbConnection")
DbConnection()

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend URL
  credentials: true,  // Allow credentials (cookies, sessions, etc.)
  methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allow headers
}));

app.use(cookieParser())
app.use(express.json());

const userRouter = require("./router/userRouter");


app.use("/users", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT - ${process.env.PORT}`);
});
