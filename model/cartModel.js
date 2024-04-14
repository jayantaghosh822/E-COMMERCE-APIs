const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema(
    {
    product:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' ,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    size:{
    type:String,
    required:true,
   },
   quan:{
    type:Number,
    required:true,
   },
  
}

);
const Cart = mongoose.model('Cart',CartSchema);

module.exports = { Cart };