const mongoose=require('mongoose')
const Schema=  mongoose.Schema
const userSchema = new Schema({
    fullname:String,
    email:String,
    phone:String,
})
module.exports=mongoose.model('user',userSchema);