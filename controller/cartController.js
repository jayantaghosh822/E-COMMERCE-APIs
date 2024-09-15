var express = require('express');
var app = express();
const cors = require('cors');
app.use(cors());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const cartModel = require('../model/cartModel.js');
const cart = cartModel.Cart;


const size = require('../model/sizeModel.js');
const sizes = size.Size;


const add_to_cart = async(req,res)=>{
    console.log('request');
    console.log('request',req);
    console.log('request');
    // console.log(req.user);
    const user_id = req.user._id;
    let {product,size,quan} = req.body;
    try{
      if(size=="none"){
        res.status(201).send({
          success:false,
          message:"Please Add A Size",
      })
      }else{
        const find_item = await cart.findOne({product,user_id,size});
        if(find_item){
            console.log(find_item);
            if(find_item.size!=req.body.size){
                const item = new cart({product,user_id,size,quan});
                const result =  await item.save();
                if(result){
                    return res.status(200).send({
                    'message' : 'item added to cart',
                    })
                }
            }
            else{
                const updated_quan = find_item.quan+quan;
                console.log(updated_quan);
                quan = updated_quan;
                const update_item =  await cart.findByIdAndUpdate(find_item._id, {product,user_id,size,quan}, { new: true });
                if(update_item){
                    return res.status(200).send({
                        'message' : 'cart updated',
                    })
                }
            }
        }
        else{
        const item = new cart({product,user_id,size,quan});
        const result =  await item.save();
        if(result){
            return res.status(200).send({
            'message' : 'item added to cart',
            })
        }
        }
      }

    }
    catch(error){
        console.log(error);
        res.status(201).send({
          success:false,
          'message' : 'Something Went Wrong',
      })
    }
   
}
const get_cart_items = async(req,res)=>{
    // console.log(req.user);
    try{
        const cart_items = await cart.find({user_id:req.user._id}).populate('product').populate('size');
        if(cart_items){
          // const size_details = await casizesrt.find({_id:req.user._id}).populate('product');
            // console.log(cart_items);
            res.status(201).send({
              success:true,
              items:cart_items,
          })
        }
      
    }
    catch(err){
        console.log(err);
    }
  
}

const update_cart_items = async (req, res) => {
    const item_id = req.params.item_id;
    const quan = req.body.quantity;
    if(!item_id || !quan){
      return res.status(200).send({ message: 'Item updated in cart' });
    }
    try {
      const get_item = await cart.findById(item_id);
      if (get_item) {
        console.log('Found item:', get_item);
  
        if (quan === 0) {
          const deleted_item = await cart.deleteOne({ _id: get_item._id });
          console.log(deleted_item);
          if (deleted_item.deletedCount > 0) {
            return res.status(200).send({ message: 'Item deleted from cart' });
          }
        } else {
          console.log('Updating item with quantity:', quan);
          const updated_item = await cart.findByIdAndUpdate(
            get_item._id,
            { quan },
            { new: true } // Return the updated document
          );
          console.log('Updated item:', updated_item);
          if (updated_item) {
            return res.status(200).send({ message: 'Item updated in cart' });
          }
        }
      } else {
        return res.status(404).send({ error: 'Item not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: 'Internal server error' });
    }
  };

  const remove_cart_item = async(req,res)=>{
    const item_id = req.params.item_id;
    console.log('item_id',item_id);
    try{
      result = await cart.deleteOne({ _id: item_id });
      console.log(result);
      if(result){
        return res.status(200).send({ 
        success: true,
        message: "cart item deleted"
        });
      }
    }
    catch(err){
      console.log(err)
      return res.status(404).send({ 
      success: true,
      message: "something went wrong"
        });
    }
  }

  const delete_cart_items = async(req,res)=>{
    const user_id = req.user._id;
    console.log(user_id);
    let result = "";
    try{
      result = await cart.deleteMany({ user_id: user_id });
      console.log(result);
      if(result){
        return res.status(200).send({ 
        success: true,
        message: "cart items deleted"
        });
      }
    }
    catch(err){
      console.log(err)
      return res.status(404).send({ 
      success: true,
      message: "something went wrong"
        });
    }
   


  }
  
module.exports = {add_to_cart,get_cart_items,update_cart_items,remove_cart_item,delete_cart_items};