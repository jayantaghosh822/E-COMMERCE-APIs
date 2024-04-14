// import express from 'express';
// import connect_db from './config/db';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: false
//   }));
const cors = require('cors');
app.use(cors({origin: process.env.CLIENT_URL})); 
app.use(cors({
    origin:["http://localhost:3000","https://thriving-mandazi-2580ba.netlify.app"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true
}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'https://thriving-mandazi-2580ba.netlify.app');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const data_base = require("./config/db");
data_base.Connect_db();
 const authRoutes = require("./routes/authRoute");
 const categoryRoutes = require("./routes/categoryRoutes");
 const brandsRoutes = require("./routes/brandsRoute");
 const productRoutes = require("./routes/productRoute");
 const cartRoutes = require("./routes/cartRoute");
 
// app.post('/api/v1/auth/register', (req, res) => { 
//     console.log(req);
// }); 
app.use("/api/v1/auth/",authRoutes.router);
app.use("/api/v1/auth/",categoryRoutes.router);
app.use("/api/v1/auth/",brandsRoutes.router);
app.use("/api/v1/auth/",productRoutes.router);
app.use("/api/v1/auth/",cartRoutes.router);


// const userModel = require('./model/userModel.js');
// const user = userModel.User;
// app.post("/del_users",async(req,res)=>{
//     console.log("here");
//     var myquery = { name: /^S/ };
//     const deleteManyResult = await user.deleteMany(myquery);
//     console.log(deleteManyResult);
// })



var bodyParser = require('body-parser');
app.listen(5000);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(express.json());
app.set('view engine','ejs');
var session = require('express-session');



require("dotenv").config(); 
 
const stripe = require("stripe")("sk_test_51LX0WLSBdfOGEPmAWrkusfIomBJ8uG9q02Lf3NJpPqPfO82lWHBicyPGvLpIIUQDCv4Nlb2vKeEKhPgylO7zsFV400shpQFWJ3"); 

 app.get("/",async(req,res)=>{
   res.send('Hello World');
   // const my_user = await user.find(); 
  // console.log(my_user);
   // res.send(my_user);
   // var myquery = { name: /^S/ };
   // const deleteManyResult = await user.deleteMany(myquery);
   // console.log(deleteManyResult);
 });


 // This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_7e2d8f6798f66b5eb6e64f0d5167f003565e5364166e5e7542732271c2897c4f";
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};
app.post("/payment", async(req, res) => {
  // const body = {
  //   source: req.body.token.id,
  //   amount: req.body.amount,
  //   currency: "inr"
  // };
  const customer = await stripe.customers.create({
    email: 'arghag43@gmail.com', // Pass email (Optional)
    name: "Shayan Ghosh", // Pass name (Optional)
  });
  if(customer){
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1200, // Specify amount here
      currency: "usd" ,// Specify currency here
      customer: customer.id, // Specify customer id
      setup_future_usage: 'off_session', // Include this if you plan to charge card off session (where user is not involved like recurring payments)
    });
    if(paymentIntent){
      console.log(paymentIntent);
        }
  }

  
  // stripe.charges.create(body, stripeChargeCallback(res));
});

app.post('/get-payment-intent', async (req, res)=>{

  /*it creates a payment intent using the Stripe library.*/
  
  const paymentIntent = await stripe.paymentIntents.create({
  
  amount: 100,
  
  currency: 'inr',
  
  });
  console.log(paymentIntent.client_secret);
  res.json({ clientSecret: paymentIntent.client_secret });
  
  });

  app.post('/payment-success', async (req, res)=>{

   console.log("cucceded Payment")
    
    });
    
  