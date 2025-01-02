const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); //Cross Origin Resource Sharing (middleware that connects frontend and backend)
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session"); //used to create session
const MongoStore = require("connect-mongo"); //used for mongostore

const UserModel = require("./model/user");
dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, //origin will have the frontend url
    credentials: true, //used in client request to send cookies and other credentials
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

// Creating session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, //session_secret - it contains alphanumeric characters in it
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //1 day
    },
  })
);

app.post("https://mern-user-authentication.vercel.app/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name + " " + email + " " + password);
    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "USER ALREADY EXISTS" }); //400-bad request
    }
    const hashedPassword = await bcrypt.hash(password, 10); //await-it waits and stores the value(does work in order)
    const NewUser = new UserModel({ name, email, password: hashedPassword }); //hashed password will be saved in it
    const savedUser = await NewUser.save();
    res.status(201).json({ message: "USER CREATED SUCCESSFULLY", savedUser }); //201-good request
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for entering the login credentials we use the post method here
app.post("https://mern-user-authentication.vercel.app/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const PasswordMatch = await bcrypt.compare(password, user.password);
      if (PasswordMatch) {
        req.session.user = { id: user._id, name: user.name, email: user.email };
        return res.status(200).json("SUCCESS");
      } else {
        return res.status(401).json({ message: "INCORRECT PASSWORD" });
      }
    } else {
      return res.status(400).json({ message: "NO RECORDS FOUND" });
    }
  } catch (error) {
    console.error("Error in /login route:", error);
    return res.status(500).json({ error: error.message });
  }
});

//here we are submitting the data to the session
app.get("https://mern-user-authentication.vercel.app/users", (req, res) => {
  try {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ message: "NOT AUTHENTICATED" });
    }
  } catch (error) {
    console.error("Error in /users route:", error);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
});


app.post("https://mern-user-authentication.vercel.app/logout",(req,res)=>{
if(req.session){
  req.session.destroy(err=>{
    if(err){
      res.status(500).json({error:"FAILED TO LOGOUT"})
    }
    else{
      res.status(200).json({message:"LOGGED OUT SUCCESSFULLY"})
    }
  })
}
else{
  res.status(400).json({message:"NO SESSION FOUND"})
}
  })

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON THE PORT ${process.env.PORT}`);
});
