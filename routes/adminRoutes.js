const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { addProduct } = require("../controllers/adminController");

router.get("/test", (req, res) => {
  res.send("Admin route is working");
});

router.post(
  "/products",
  protect,
  adminOnly,
  upload.single("image"),
  addProduct
);

module.exports = router;