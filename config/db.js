// import mongoose from 'mongoose';
var express = require('express');
const mongoose = require('mongoose');
 const uri = "mongodb+srv://vercel-admin-user-65a42be41fcdc35ed0f17878:XTBsRgoMt5i27Zcn@cluster0.0o7bjqw.mongodb.net/ecommerce?retryWrites=true&w=majority";
//const uri = "mongodb+srv://renderaccess:sc5no9DyVh9lcs5w@cluster0.fyhrqyd.mongodb.net/e-commerce?retryWrites=true&w=majority";
// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
const Connect_db = async()=>{
    try{
       const connect = await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
       });
       console.log("connected");
       //res.send('connected');
    }
    catch(error){
        console.log(error);
    }
}
// const UserSchema = new mongoose.Schema({
//     name:String,
//     password:String,
// });
// const User = mongoose.model('User',UserSchema);

module.exports = { Connect_db };

