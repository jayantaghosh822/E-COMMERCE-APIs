const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
   name:{
    type:String,
    required:true,
    trim:true,
   },
   slug:{
    type:String,
    required:true,
    unique:true,
   },
   parent:{
    type:String,
    required:true,
    trim:true,
   },
}

);
const Category = mongoose.model('Category',UserSchema);

module.exports = { Category };