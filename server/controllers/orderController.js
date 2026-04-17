
const Order = require("../models/Order");

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      status: "Pending", 
    });

    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getOrders = async (req, res) => {
  try {
    const userId = req.query.userId;
    const role = req.query.role;

    let orders;

    if (role === "seller") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ userId });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 ADD REVIEW WITH VALIDATION
exports.addReview = async (req, res) => {
  try {
    const { orderId, itemIndex, review, rating, userId } = req.body;

    const order = await Order.findById(orderId);

    // ❌ Not owner
    if (order.userId !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const item = order.items[itemIndex];

    // ❌ Already reviewed
    if (item.review) {
      return res.json({ message: "Already reviewed" });
    }

    item.review = review;
    item.rating = rating;

    await order.save();

    res.json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
