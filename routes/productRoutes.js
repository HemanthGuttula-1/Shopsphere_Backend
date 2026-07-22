const express = require("express");

const {
  getProducts,
  getProductById,
  getRelatedProducts,
  deleteProduct,
} = require("../controllers/productController");

const protect  = require('../middleware/authMiddleware')
const adminOnly = require('../middleware/adminMiddleware')

const upload = require('../middleware/upload')

const router = express.Router();

router.get("/", getProducts);

router.get("/related/:id", getRelatedProducts)

router.get("/:id", getProductById);

router.delete("/:id", deleteProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;