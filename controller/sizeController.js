var express = require('express');
var app = express();
const cors = require('cors');
app.use(cors());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const sizeModel = require('../model/sizeModel.js');

const size = sizeModel.Size;

const create_size = async(req,res) =>{
console.log(req.body);
const slug = req.body.sizeslug;
const name = req.body.sizename;
existing_size=await size.findOne({slug:req.body.sizeslug});
console.log(existing_size);
if(existing_size!=null){
    return res.status(200).send({
        success:false,
        message:"size Exists With Same Slug"
    })
}
if(slug==null){
   return res.status(200).send({
        success:false,
        message:"size Must Have A slug",
    })
}
if(name==null){
   return res.status(200).send({
        success:false,
        messgae:"size Must Have A name"
    })
}
if(existing_size==null && slug!=null && name!=null ){
    const name = req.body.sizename;
    const slug = req.body.sizeslug;
    const parent = req.body.parent_sizeslug;
    new_size = await new size({name,slug,parent}).save();
    console.log(new_size);
    return res.status(200).send({
        success:true,
        messgae:"size Added"
    })
}
}
const all_size = async(req,res) =>{
   const all_sizes = await size.find();
   console.log(all_sizes);
   return res.status(200).send({
    success:true,
    result:all_sizes
})
}
const delete_size = async(req,res) =>{
    console.log(req.headers.size_id);

    const del_sizes = await size.deleteOne({_id:req.headers.size_id});
    console.log(del_sizes);
    if(del_sizes){
        return res.status(200).send({
            success:true,
            message:"size Deleted Successfully"
        })
    }
   
 }
 const get_size = async(req,res) =>{
    //console.log(req.headers);
    const cat_id = req.headers.cat_id;
    const get_sizes = await size.findOne({_id:cat_id});
    console.log(get_sizes);
    if(get_sizes){
        return res.status(200).send({
            success:true,
            result:get_sizes
        })
    }
   
 }

 const get_size_name_by_id = async(req,res) =>{
    //console.log(req.headers);
    const cat_id = req.headers.cat_id;
    console.log(cat_id);
    const get_sizes = await size.findOne({_id:cat_id});
    console.log(get_sizes.name);
    if(get_sizes){
        return res.status(200).send({
            success:true,
            result:get_sizes.name,
        })
    }
   
 }
 const update_size = async(req,res) =>{
    //console.log(req.headers);
    const cat_id = req.headers.cat_id;
    
    const update = {
        $set: {
          name: req.body.catname,
          slug:  req.body.catslug,
        }
      };
    const update_sizes = await size.updateOne({_id:cat_id},update);
    console.log(update_sizes);
    if(update_sizes){
        return res.status(200).send({
            success:true,
            result:update_sizes
        })
    }
   
 }

const child_sizes = async(req,res) =>{
     const cat_id = req.headers.cat_id;
     const sub_cat = await size.find({parent:cat_id});
    if(sub_cat){
     return res.status(200).send({
            success:true,
            result:sub_cat
        })
    }
}
module.exports = {create_size,all_size,delete_size,get_size,get_size_name_by_id,update_size,child_sizes};