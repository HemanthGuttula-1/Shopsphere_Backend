const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPaymentOrder,
  verifyPayment
} = require("../controllers/paymentController");
const { verify } = require("jsonwebtoken");

router.post(
  "/create-order",
  protect,
  createPaymentOrder
);


router.post(
  '/verify',
  verifyPayment
)

module.exports = router;