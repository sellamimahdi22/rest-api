const express=require('express');
const connect = require('./config/connect');
require('dotenv').config({path:"./config/.env"})
const user = require('./models/user');

const app=express();

app.use(express.json());
connect()

app.post('/add',async(req,res)=>{
    const {fullname,email,phone}=req.body
    try {
        const newUser= new user({
            fullname,
            email,
            phone,
        })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
})
app.get('/getuser',async(req,res)=>{
    const users=await user.find()
    res.send(users)
})
app.get('/get/:id',async(req,res)=>{
    const users=await user.findById(req.params.id)
    res.send(users)
})

app.put("/update/:id",async(req,res)=>{
    try {
        const edituser=await user.findByIdAndUpdate(req.params.id,{...req.body},{new :true})
    res.send(edituser);
    } catch (error) {
        console.log(error)
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try {
         await user.findByIdAndDelete(req.params.id);
         res.send("user deleted")
    } catch (error) {
        console.log(error)
    }
})
var PORT = process.env.PORT || 6000
app.listen(PORT,err=>err?console.log(err):console.log(` server is runing on ${PORT}`))