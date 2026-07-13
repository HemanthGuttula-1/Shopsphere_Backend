const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        products: [],
      });
    }

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    await cart.populate("products.product");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate("products.product")
    
    res.status(200).json(cart);
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

    const cartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cartItem.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json(updatedCart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity
};