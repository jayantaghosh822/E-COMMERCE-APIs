const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {
   order_details:{
    type:Array,
    required:true,
    trim:true,
   },
   session_id:{
    type:String,
    required:true,
   },
   user_id:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' ,
    required:true,
   },
   createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  
}

);
const Order = mongoose.model('Order',OrderSchema);

module.exports = { Order };
