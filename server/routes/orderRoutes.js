const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  addReview,
} = require("../controllers/orderController");

router.post("/", createOrder);        // ✅ FIXED
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus);
router.post("/review", addReview);

module.exports = router;
