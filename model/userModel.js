const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
   name:{
    type:String,
    required:true,
    trim:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        required: true,
    }
}

);
const User = mongoose.model('User',UserSchema);

module.exports = { User };