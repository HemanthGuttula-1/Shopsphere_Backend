const Product = require("../models/Product");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    
    const folder = `products/${category.toLowerCase()}`

    const uploadedImage = await uploadToCloudinary(req.file.buffer,folder);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      image: uploadedImage.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.stock = req.body.stock;

    if (req.file) {
      const image = await uploadToCloudinary(
        req.file.buffer,
        "shopsphere/products"
      );

      product.image = image.secure_url;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
};