import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { state } = useLocation();
  const product = state?.product;

  const navigate = useNavigate();
  const { addToCart, clearCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const role = localStorage.getItem("role"); // 🔥 IMPORTANT

  const images = product?.images || [product.image];
  const stock = product?.stock || {};

  if (!product) return <p>Product not found</p>;

  const handleAdd = () => {
    if (!selectedSize) return alert("Select size");
    if (stock[selectedSize] === 0)
      return alert("Out of stock");

    addToCart({ ...product, size: selectedSize });
    alert("Added to cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) return alert("Select size");
    if (stock[selectedSize] === 0)
      return alert("Out of stock");

    clearCart();
    addToCart({ ...product, size: selectedSize, qty: 1 });
    navigate("/checkout");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div>
          <img
            src={images[currentImage]}
            alt={product.name}
            className="w-full h-80 object-cover rounded"
          />

          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                onClick={() => setCurrentImage(i)}
                className={`w-16 h-16 cursor-pointer border ${
                  currentImage === i ? "border-black" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">₹{product.price}</p>

          <p className="mt-4">
            {product.description || "No description"}
          </p>

          {/* SIZE */}
          <div className="mt-4">
            <p className="font-semibold">Select Size:</p>

            <div className="flex gap-2 mt-2">
              {Object.keys(stock).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : ""
                  } ${
                    stock[size] === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={stock[size] === 0}
                >
                  {size}
                </button>
              ))}
            </div>

            {selectedSize && (
              <p className="text-sm mt-1">
                Stock: {stock[selectedSize]}
              </p>
            )}
          </div>

          {/* 🔥 BLOCK SELLER */}
          {role !== "seller" ? (
            <div className="mt-6 space-y-2">
              <button onClick={handleAdd} className="btn w-full">
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          ) : (
            <p className="mt-6 text-red-500 font-semibold">
              Sellers cannot purchase products
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;