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
const order = orderModel.Order;

const payment = async (req, res) => {
    //console.log(req.params.userId);
    const user_id = req.params.userId;
//   console.log(req.body);
 
  

    try {
        let order_details = req.body;
        const lineitems = order_details.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.product.name,
                },
               
                unit_amount: product.product.price * 100,
            },
            quantity: product.quan
        }));
      //console.log(order_details);
      order_details = order_details.map((cart)=>({
        product_id:cart.product._id,
        product_name:cart.product.name,
        unit_amount: cart.product.price,
        quantity: cart.quan,
        size:cart.size,       
        cart_id : cart._id
      }));
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
                order :JSON.stringify(order_details),
              },
            mode: "payment",
            success_url: "http://localhost:3000/successful-payment?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cart",
        });

        if (session) {
            console.log(session);
            // Assuming you have a function to delete cart items
           // await deleteCartItems(req.params.userId); // Call your delete cart items function here
            return res.status(200).send({
                session
            });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).send({ error: "Payment processing error" });
    }
}

// async function deleteCartItems(userId) {
//     try {
//         // Your logic to delete cart items for the given userId
//         // Example: await Cart.deleteMany({ userId: userId });
//         console.log("Cart items deleted for user ID:", userId);
//     } catch (error) {
//         console.error("Error deleting cart items:", error);
//         throw error; // Handle the error or throw it further
//     }
// }

const payment_status= async(req,res) =>{

const session_id = req.params.session_id;
console.log(session_id);
const session = await stripe.checkout.sessions.retrieve(
    session_id
  );
console.log("ordered_items",session.metadata.order);
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
// return res.status(200).send({ payment_status: get_order_details });
}


module.exports = {payment,payment_status};