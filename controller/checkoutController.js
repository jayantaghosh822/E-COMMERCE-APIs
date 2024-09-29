var express = require('express');
var app = express();
const stripe = require("stripe")("sk_test_51LX0WLSBdfOGEPmAWrkusfIomBJ8uG9q02Lf3NJpPqPfO82lWHBicyPGvLpIIUQDCv4Nlb2vKeEKhPgylO7zsFV400shpQFWJ3");
const cors = require('cors');
app.use(cors());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const cartModel = require('../model/cartModel.js');
const cart = cartModel.Cart;
const userModel = require('../model/userModel.js');
const user = userModel.User;

const orderModel =  require('../model/orderModel.js');
// const { JSONParser } = require('formidable/parsers/index.js');
// const { json } = require('body-parser');
const order = orderModel.Order;

const payment = async (req, res) => {
    //console.log(req.params.userId);
    const user_id = req.params.userId;
//   console.log(req.body);
 
  

    try {
        let order_details = req.body.cartItems;
        let shippingCharge = req.body.shippingCharge;
        const lineitems = order_details.map((cart) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: cart.product.name,
                    metadata:{
                      product_id: cart.product._id,
                      size: cart.size.name?cart.size.name:'', 
                      cart_item_id: cart._id
                    },
                },
               
                unit_amount: cart.product.price * 100,
            },
            quantity: cart.quan
        }));
        // lineitems.push({
        //   price_data: {
        //     currency: "inr",
        //     product_data: {
        //       name: "Shipping",
        //     },
        //     unit_amount: shippingCharge*100, // Shipping charge in cents
        //   },
        //   quantity: 1, // Typically, quantity is 1 for shipping
        // });
      // console.log(lineitems);
      // lineitems
      // return;
      // order_details = order_details.map((cart)=>({
      //   // product_id:cart.product._id,
      //   product_name:cart.product.name,
      //   unit_amount: cart.product.price,
      //   quantity: cart.quan,
      //   size:cart.size.name?cart.size.name:'',   
      //   metadata: {
      //     product_id: cart.product._id, // Example product ID
      //   },    
      //   // cart_id : cart._id
      // }));
        order_details.user_id = user_id;
        console.log("ordr detAILS:",order_details);
        // const order_item = new order({order_details,user_id});
        // const result =  await order_item.save();
      
        // const created_order_id = result._id;
        // console.log('order_id',created_order_id);
        // console.log(typeof(created_order_id));
        console.log(typeof(order_details));
        console.log(String(order_details));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineitems,
            metadata:{
                user_id :JSON.stringify(user_id),
              },
            mode: "payment",
            success_url: "http://localhost:3000/successful-payment?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cart",
            shipping_options: [
              {
                  shipping_rate_data: {
                      display_name: 'Standard Shipping',
                      type: 'fixed_amount',
                      fixed_amount: {
                          amount: 12000, // Shipping charge in smallest currency unit (e.g., 5000 = ₹50.00)
                          currency: 'inr',
                      },
                      delivery_estimate: {
                          minimum: { unit: 'business_day', value: 3 },
                          maximum: { unit: 'business_day', value: 5 },
                      },
                  },
              },
          ],
        });

        if (session) {
            console.log(session);
            // Assuming you have a function to delete cart items
           // await deleteCartItems(req.params.userId); // Call your delete cart items function here
            // return res.status(200).send({
            //     session
            // });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).send({ error: "Payment processing error" });
    }
}



const payment_status= async(req,res) =>{

const session_id = req.params.session_id;
console.log(session_id);
const session = await stripe.checkout.sessions.retrieve(
    session_id
  );
// console.log("ordered_items",JSON.parse(session.metadata.order));
// console.log("payment_status",(session));
let payment_status=false;
let items = {
  items:null,
  total:0
};
if(session){
  console.log("stripe session",session);
    payment_status = session.payment_status;
    const date = new Date(session.created * 1000);
    if(payment_status=='paid'){
      const line_items = await stripe.checkout.sessions.listLineItems(session_id);
      console.log('line141',session.metadata.order);
        items.items = (line_items);
        items.total = JSON.parse(session.amount_total);
        // return;
        return res.status(200).send({ payment_status:true , date:date, order_details:items });
    }else{
        return res.status(200).send({ payment_status:false ,date:date, metadata:items });
    }
    
}
else{
    return res.status(200).send({ payment_status:false , message:'Invalid Session Id' });
}

// const order_id = session.metadata.order_id;

// const get_order_details = await order.findById(order_id);
// console.log(get_order_details);
// let cart_items = [];
// get_order_details.order_details.forEach((item) => {
//     cart_items.push(item.cart_id);
// });
// console.log(cart_items);
// const deleted_items = await cart.deleteMany({
//     _id: {
//         $in: cart_items
//     }
// });
// console.log(deleted_items);

}

const stripepaymenstatatuswebhook = async(request,response)=>{
  // console.log(request);
  // const jsonString = JSON.stringify(request.body);
  // const buffer = Buffer.from(jsonString, 'utf-8');
  // console.log(buffer);
  const sig = request.headers['stripe-signature'];
  const endpointSecret = "whsec_7e2d8f6798f66b5eb6e64f0d5167f003565e5364166e5e7542732271c2897c4f";
  // 1mwhsec_7e2d8f6798f66b5eb6e64f0d5167f003565e5364166e5e7542732271c2897c4f
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("erroer" , err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

// console.log(event);
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      // console.log('checkout.session.completed');
      console.log(event);
      // console.log('metadata',paymentIntentSucceeded);
      if(paymentIntentSucceeded.payment_status == 'paid'){
        const session_id = paymentIntentSucceeded.id; 
        const line_items = await stripe.checkout.sessions.listLineItems(session_id, {
          expand: ['data.price.product'],
        });
        console.log('line_items',line_items);
        const order_details=[];
        const cart_item_ids = [];
        line_items.data.forEach(item=>{
          let price = item.price;
          console.log(price);
          cart_item_ids.push(price.product.metadata.cart_item_id);
          order_details.push({product_metadata:price.product.metadata,name:item.description,total:item.amount_total,quan:item.quantity});
          
        });
        console.log('cart ids are', cart_item_ids);
        // console.log('order details', paymentIntentSucceeded.metadata);
        // const order_details =  JSON.parse(paymentIntentSucceeded.metadata.order);
        console.log('order details', order_details);
        const user_id = JSON.parse(paymentIntentSucceeded.metadata.user_id);
        console.log('userID', user_id);
        const order_item = new order({order_details,user_id});
        const order_save_status =  await order_item.save();
        if(order_save_status){
          console.log(order_save_status);
          await cart.deleteMany({ user_id: user_id });
        }
      }
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

module.exports = {payment,payment_status,stripepaymenstatatuswebhook};
