const Order = require("../models/Order");

// CREATE
exports.createOrder = async (req, res) => {
try {
const order = new Order({
...req.body,
status: "Pending", // ✅ ensure status always exists
});

```
await order.save();
res.json({ message: "Order placed successfully" });
```

} catch (err) {
res.status(500).json({ error: err.message });
}
};

// GET (✅ FIXED)
exports.getOrders = async (req, res) => {
try {
const userId = req.query.userId;
const role = req.query.role;

```
let orders;

if (role === "seller") {
  // seller sees all orders
  orders = await Order.find();
} else if (userId) {
  // user sees their own orders
  orders = await Order.find({ userId });
} else {
  // fallback (important for browser testing)
  orders = await Order.find();
}

res.json(orders);
```

} catch (err) {
res.status(500).json({ error: err.message });
}
};

// STATUS (✅ improved response)
exports.updateOrderStatus = async (req, res) => {
try {
const updated = await Order.findByIdAndUpdate(
req.params.id,
{ status: req.body.status },
{ new: true }
);

```
res.json(updated);
```

} catch (err) {
res.status(500).json({ error: err.message });
}
};

// 🔥 ADD REVIEW WITH VALIDATION
exports.addReview = async (req, res) => {
try {
const { orderId, itemIndex, review, rating, userId } = req.body;

```
const order = await Order.findById(orderId);

if (!order) {
  return res.status(404).json({ message: "Order not found" });
}

// ❌ Not owner
if (order.userId !== userId) {
  return res.status(403).json({ message: "Not allowed" });
}

const item = order.items[itemIndex];

if (!item) {
  return res.status(404).json({ message: "Item not found" });
}

// ❌ Already reviewed
if (item.review) {
  return res.json({ message: "Already reviewed" });
}

item.review = review;
item.rating = rating;

await order.save();

res.json({ message: "Review added" });
```

} catch (err) {
res.status(500).json({ error: err.message });
}
};
