// var path = require('path');
// var filename = path.basename('/Users/Refsnes/demo_path.js');
// const registerControllers = require('E:\\Mern ECommerce\\E-COMMERCE-APIs\\controller\\authController.js');

var express = require('express');
var app = express();
const multer = require('multer');
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
let upload = multer();
const productModel = require('../model/productModel.js');
const productMultipleImages = require('../model/ProductImages.js');
const product = productModel.Product;
const token_middleware = require ('../middlewares/authMiddleware');
const registerControllers = require('../controller/productController');
const get_product_by_slug = registerControllers.get_product_by_slug;
const create_product = registerControllers.create_product;
const  get_product = registerControllers.get_product ;
const  update_product = registerControllers.update_product ;
 const all_products = registerControllers.all_products;
 const del_product = registerControllers.del_product;
 const product_by_cat_slug = registerControllers.product_by_cat_slug;

 const filter_products = registerControllers.filter_products;
 const product_sizes = registerControllers.product_sizes;
 const product_images = registerControllers.product_images;
 const del_pro_images = registerControllers.del_pro_images;
const get_product_title = registerControllers.get_product_title;

var express = require('express');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/img/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
// const storage = multer.memoryStorage();
const uploadStorage = multer({ storage: storage });
router.get('/all-products',all_products);
router.get('/get-product',get_product);

router.get('/get-product/pro_slug/:slug',get_product_by_slug);
router.get('/product_by_cat_slug',product_by_cat_slug);
router.get('/filter-products',filter_products);
router.delete('/product-delete',del_product);
router.post('/add-product',uploadStorage.single('image'),create_product);
router.post('/update-product',uploadStorage.single('image'),update_product);
router.get('/product-sizes',product_sizes);
router.get('/get-product-title/:p_id',get_product_title);
router.post('/del-product-images',del_pro_images);
router.post('/upload-product-images',uploadStorage.single('file'),product_images);

router.get('/product_by_cat_slug',get_product);
router.delete('/product-delete',product_by_cat_slug);
router.post('/add-product',uploadStorage.single('image'),create_product);
router.post('/update-product',uploadStorage.single('image'),update_product);

router.get('/get-product-photo/:p_id', async(req,res)=>{
  try{
    console.log(req.params.p_id);
     const  product = await productModel.Product.findOne({_id:req.params.p_id}).select("photo");
     res.set('Content-type',product.photo.contentType);
     return res.status(200).send(product.photo.data);
  }
  catch(err){
    console.log(err);
  }
});
router.get('/get-product-images/:product_id',async(req,res)=>{
console.log(req.query);
const pro_id = req.params.product_id;
try{
  //console.log(req.params.p_id);
  //  const  productimages = await productMultipleImages.ProductVariantImages.findOne({_id:pro_id}).select("photo");
   const productimages = await productMultipleImages.ProductVariantImages.find({ product: { $in: pro_id } }).select("photo");
   const imageDataArray = [];
   console.log('productimages',productimages);
   // Iterate over the products and extract photo data
   productimages.forEach(product => {
    //  const imageData = {
    //    contentType: product.photo.contentType,
    //    data: product.photo.data
    //  };
     imageDataArray.push(product);
   });
  
   return res.status(200).send(imageDataArray);

}
catch(err){
  console.log(err);
}
})
// router.get('/all-categories',all_category);
// router.delete('/category-delete',delete_category);
// router.get('/get-category',get_category);
// router.put('/update-category',update_category);
module.exports = {router};