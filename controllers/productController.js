const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

    switch (sort) {
      case "priceAsc":
        sortOption.price = 1;
        break;

      case "priceDesc":
        sortOption.price = -1;
        break;

      case "newest":
        sortOption.createdAt = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .exec();

    const totalProducts = await Product.countDocuments(query);//not only total but for all the filtered total products
    

    res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Product
const createProduct =
  async (req, res) => {

  try {

    const product =
      await Product.create(
        req.body
      );

    res.status(201).json(
      product
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument:"after",
        runValidators:true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({
        user: req.user.id,
      });

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      const item = cart.products.find(
        (item) =>
          item.product.toString() === productId
      );

      if (item) {
        item.quantity = quantity;
      }

      await cart.save();

      res.status(200).json(cart);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateCartQuantity,
};