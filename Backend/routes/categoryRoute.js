const express = require('express');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController')
const { requireSignIN, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ensure that the order of middleware is correct
router.post('/create-category', requireSignIN, isAdmin, createCategoryController);
//uopdate 
router.put('/update-category/:id',requireSignIN,isAdmin,updateCategoryController);
//getallcategory
router.get("/get-category",categoryController)
//single-category
router.get("/single-category/:slug",singleCategoryController)
//delete category
router.delete("/delete-category/:id",requireSignIN,isAdmin,deleteCategoryController)

module.exports = router;
