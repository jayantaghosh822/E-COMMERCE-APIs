// var path = require('path');
// var filename = path.basename('/Users/Refsnes/demo_path.js');
// const registerControllers = require('E:\\Mern ECommerce\\E-COMMERCE-APIs\\controller\\authController.js');
const categoryModel = require('../model/categoryModel.js');
const category = categoryModel.Category;
const token_middleware = require ('../middlewares/authMiddleware');
const registerControllers = require('../controller/categoryController');
const create_category = registerControllers.create_category;
const all_category = registerControllers.all_category;
const delete_category = registerControllers.delete_category;
const get_category = registerControllers.get_category;
const get_category_name_by_id = registerControllers.get_category_name_by_id;
const update_category = registerControllers.update_category;
const child_categories =  registerControllers.child_categories;
var express = require('express');
const router = express.Router();
router.post('/create-category',create_category);
router.get('/all-categories',all_category);
router.delete('/category-delete',delete_category);
router.get('/get-category',get_category);
router.get('/get-category-name',get_category_name_by_id);
router.put('/update-category',update_category);
router.get('/child_categories',child_categories);
<<<<<<< HEAD
module.exports = {router};
=======
module.exports = {router};
>>>>>>> b8fa8d541a9066c2be125a4daa08793a5826b409
