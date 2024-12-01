const slugify = require("slugify"); // Standard import
const productModel = require("../models/productModel");
const categoryModel=require("../models/categoryModel")
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    // Create product object
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Handle photo if provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save product to the database
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product successfully created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product creation",
      error,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalcount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set('Content-type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(404).send({ success: false, message: "No photo found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot get photo",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const result = await productModel.findByIdAndDelete(req.params.pid);
    if (!result) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Find the product to update
    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.quantity = quantity;
    product.shipping = shipping;

    // Handle photo if provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save updated product
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};
const productFilterController=async(req,res)=>{
try {
  const {checked,radio}=req.body
let args={}
if(checked.length>0)args.category=checked
if(radio.length ) args.price={$gte:radio[0], $lte:radio[1]}
 const products=await productModel.find(args)
 res.status(200).send({
  success:true,
  products,
 })
} catch (error) {
  console.log(error)
  return res.status(400).send({
    success:false,
    message:"fliter products  error ",
    error,
  })
  
}
}
const productCountController=async(req,res)=>{
  try {
    const total=await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success:true,
      total,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in count",
      error,
    })
  }
}

const productListController=async(req,res)=>{
try {
  const perPage=4
  const page=req.params.page ? req.params.page:1
  const products=await productModel.find({})
  .select("-photo")
  .skip((page-1)*perPage)
  .limit(perPage)
  .sort({createdAt:-1})
  res.status(200).send({
    success:true,
    products,
  })
} catch (error) {
  console.log(error)
  return res.status(400).send({
    success:false,
    message:"error in per page",
    error,
  })
}
}
 const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
 const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

const ProductCategoryController=async(req,res)=>{

  try {
    const category=await categoryModel.findOne({slug:req.params.slug})
    const products=await productModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      category,
      products,
    })
    
    
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success:true,
      error,
      message:"error while getting products"
    })
    
  }
}



module.exports = { createProductController,relatedProductController,ProductCategoryController,   productCountController,searchProductController,     productListController,   productFilterController,   updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController };
