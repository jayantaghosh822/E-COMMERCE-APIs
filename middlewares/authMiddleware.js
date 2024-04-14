var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../model/userModel.js');
const User = userModel.User;
// get config vars
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));
const cors = require('cors');

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const requireSignIn = async(req,res,next) =>{
    console.log('auth',req.headers.authorization);
try{
   // console.log(req.headers.authorization);
   console.log(process.env.TOKEN_SECRET);
    if(req.headers.authorization){
    const user = JWT.verify(req.headers.authorization,process.env.TOKEN_SECRET);
    // console.log('user-error',user);
    let userX = await User.findById(user._id).select('email');
    //console.log(userX);
    req.user = userX;
     next();
    }
    else{
        res.status(201).send({
            success:false,
            message:"empty token",
        })
    }

}
catch(err){
    res.status(201).send({
        success:false,
        message:"token error",
    })
    console.log(err);
}
}
const is_admin = async(req,res,next)=>{
    //const user_name = req.body.name;
    //console.log(req.user);
    const user_email=req.user.email;
    try{
    const my_user = await User.findOne({ email: user_email }); 
    //console.log(my_user);
    const name = my_user.name;
    if(user_email=="arghag123@gmail.com"){
        // res.status(201).send({
        //     success:true,
        //     message:"Admin",
        //     name:my_user.name,
        //     phone:my_user.phone,
        // });
       
        next();
    }
    else{
        req.user = "testuser";
        res.status(201).send({
            success:false,
            message:"You Are Not Admin",
            name:my_user.name,
            phone:my_user.phone,
        })
    }
    }
    catch(err){
        console.log(err);
        res.send(err);
      
    }
}

module.exports = {requireSignIn ,is_admin };