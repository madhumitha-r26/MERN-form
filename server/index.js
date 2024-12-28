const mongoose=require('mongoose')
const express=require('express')
const cors=require('cors')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')

const UserModel=require('./model/user')

dotenv.config()
const app=express()
app.use(express.json())

app.use(cors());
//middleware that connect frontend and backend

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log(err))

app.post('/register',async(req,res)=>{
    try{
        const {name,email,password}=req.body
        console.log(name+""+email+""+password)
        const existingUser=await UserModel.findOne({email})
        console.log(existingUser)
        if(existingUser){
            return res.status(400).json({message:"User already exists"}) //400-bad request
        }
        const hashedPassword=await bcrypt.hash(password,10) //await-it waits and stores the value(does work in order)
        const NewUser=new UserModel({name,email,password:hashedPassword}) //hashed password will be saved in it
        const savedUser= await NewUser.save()
        res.status(201).json({message:"User created successfully",savedUser}) //201-good request
        }
        catch(error){
            res.status(500).json({error:error.message})
        }
})


app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${process.env.PORT}`)
})