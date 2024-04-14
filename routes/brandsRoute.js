// var path = require('path');
// var filename = path.basename('/Users/Refsnes/demo_path.js');
// const registerControllers = require('E:\\Mern ECommerce\\E-COMMERCE-APIs\\controller\\authController.js');
const brandModel = require('../model/brandModel.js');
const brand = brandModel.Category;
const token_middleware = require ('../middlewares/authMiddleware');
const registerControllers = require('../controller/brandsController');
const create_brand = registerControllers.create_brand;
const all_brands = registerControllers.all_brands;
const delete_brand = registerControllers.delete_brand;
const get_brand = registerControllers.get_brand;
const get_brand_name_by_id = registerControllers.get_brand_name_by_id;
const update_brand = registerControllers.update_brand;
var express = require('express');
const router = express.Router();
router.post('/create-brand',create_brand);
router.get('/all-brands',all_brands);
router.delete('/brand-delete',delete_brand);
router.get('/get-brand',get_brand);
router.get('/get-brand-name',get_brand_name_by_id);
router.put('/update-brand',update_brand);
<<<<<<< HEAD
module.exports = {router};
=======
module.exports = {router};
>>>>>>> b8fa8d541a9066c2be125a4daa08793a5826b409
