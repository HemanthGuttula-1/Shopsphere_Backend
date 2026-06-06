const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, adminOnly, createProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;