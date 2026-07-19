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

module.exports = {
  addProduct,
};