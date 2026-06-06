const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get(
  "/all",
  protect,
  adminOnly,
  getAllOrders
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateOrderStatus
);

module.exports = router;