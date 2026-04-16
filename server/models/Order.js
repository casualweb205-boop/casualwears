const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      price: Number,
      image: String,
      qty: Number,
      size: String,

      review: {
        type: String,
        default: "",
      },

      rating: {
        type: Number,
        default: 0,
      },
    },
  ],
  total: Number,
  paymentMethod: String,
  address: String,
  phone: String,

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);