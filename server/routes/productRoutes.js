const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);   // 🔥 DELETE
router.put("/:id", updateProduct);      // 🔥 UPDATE

module.exports = router;