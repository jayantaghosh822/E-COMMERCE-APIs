const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {
   order_details:{
    type:Array,
    required:true,
    trim:true,
   },
   user_id:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' ,
    required:true,
   },
  
}

);
const Order = mongoose.model('Order',OrderSchema);

module.exports = { Order };