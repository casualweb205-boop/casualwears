const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,

  // 🔥 MULTIPLE IMAGES
  images: [String],

  // 🔥 SIZE-WISE STOCK
  stock: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Product", productSchema);