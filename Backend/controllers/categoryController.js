const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

// Create Category
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).send({
                message: "Name is required and must be a non-empty string",
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in category creation',
        });
    }
};

// Update Category
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).send({
                message: "Name is required and must be a non-empty string",
            });
        }
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).send({
            success: true,
            message: 'Category updated',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get All Categories
const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories retrieved successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while retrieving all categories",
        });
    }
};

// Get Single Category
const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single category retrieved successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while retrieving single category",
        });
    }6
};
const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while deleting category",
            error,

        })
    }

}
module.exports = {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController,
};
