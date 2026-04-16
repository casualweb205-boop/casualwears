const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

//productroutes

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

//orderroutes
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

//mongose

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend 🚀" });
});

// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
