const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  addReview,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus);
router.post("/review", addReview); // 🔥 NEW

module.exports = router;