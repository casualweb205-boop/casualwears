import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleAdd = () => {
    addToCart(product);
    alert("Added to cart 🛒");
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart({ ...product, qty: 1 });
    navigate("/checkout");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">

      {/* 🔥 CLICKABLE IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded cursor-pointer"
        onClick={() => navigate("/product", { state: { product } })}
      />

      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      {role !== "seller" && (
        <>
          <button onClick={handleAdd} className="btn mt-3 w-full">
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;