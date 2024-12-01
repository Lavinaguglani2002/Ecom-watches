// const express=require('express')
// const formidable=require("express-formidable")
// const { requireSignIN,isAdmin } = require('../middlewares/authMiddleware')
// const {createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController} = require('../controllers/productController')
// const router=express.Router()
// router.post("/create-product",requireSignIN,isAdmin,formidable(),createProductController)
// router.put("/update-product/:pid",requireSignIN,isAdmin,formidable(),updateProductController)

// router.get("/get-product",getProductController)
// //single-product
// router.get("/get-product/:slug",getSingleProductController)
// //get-photo

// router.get("/product-photo/:pid",productPhotoController)
// //delete product
// router.delete("/product/:pid",deleteProductController)
// module.exports=router
const express = require('express');
const formidable = require('express-formidable');
const { requireSignIN, isAdmin } = require('../middlewares/authMiddleware');
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  ProductCategoryController,
} = require('../controllers/productController');

const router = express.Router();

// Route to create a product
router.post('/create-product', requireSignIN, isAdmin, formidable(), createProductController);

// Route to update a product by ID
router.put('/update-product/:pid', requireSignIN, isAdmin, formidable(), updateProductController);

// Route to get all products
router.get('/get-product', getProductController);

// Route to get a single product by slug
router.get('/get-product/:slug', getSingleProductController);

// Route to get a product photo by ID
router.get('/product-photo/:pid', productPhotoController);

// Route to delete a product by ID
router.delete('/product/:pid', deleteProductController);
router.post("/product-filters",productFilterController)
//count prodyuct
router.get("/product-count",productCountController)
//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword",searchProductController)

router.get("/related-product/:pid/:cid", relatedProductController);

//category-wise
router.get("/product-category/:slug",ProductCategoryController)
module.exports = router;
