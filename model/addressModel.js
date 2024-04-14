const mongoose = require('mongoose');
const UserAddressSchema = new mongoose.Schema(
    {
   userid:{
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required:true,
   },
   firstname:{
    type:String,
    required:true,
    trim:true,
   },
   lastname:{
    type:String,
    required:true,
    trim:true,
   },
   companyname:{
    type:String,
   },
    country:{
        type:String,
        required:true,
    },
    streetAddress1:{
        type:String,
        required:true,
    },
    streetAddress2:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
   email:{
    type:String,
    required:true,
   }
}

);
const UserAddress = mongoose.model('UserAddress',UserAddressSchema);

module.exports = { UserAddress };