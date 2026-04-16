import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilter, setShowFilter] = useState(false);

  const [imageIndex, setImageIndex] = useState({});
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // FETCH
  const fetchProducts = () => {
    fetch("https://casualwears.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);

        const initial = {};
        data.forEach((p) => {
          initial[p._id] = 0;
        });
        setImageIndex(initial);

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER
  useEffect(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(category)
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    setFiltered(result);
  }, [search, category, maxPrice, products]);

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`https://casualwears.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // VOICE
  const handleVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (e) => {
      setSearch(e.results[0][0].transcript);
    };
  };

  // SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const updated = { ...prev };

        products.forEach((product) => {
          const imgs =
            product.images?.length > 0
              ? product.images
              : [product.image];

          updated[product._id] =
            (updated[product._id] + 1) % imgs.length;
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* SEARCH */}
      {role !== "seller" && (
        <div className="mb-6 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="🔎 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 border rounded"
            />

            <button onClick={handleVoice} className="btn">
              🎤
            </button>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="btn"
            >
              Filter ⚙️
            </button>
          </div>

          {showFilter && (
            <div className="bg-white p-3 rounded shadow space-y-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="all">All</option>
                <option value="shirt">Shirts</option>
                <option value="tshirt">T-Shirts</option>
                <option value="jeans">Jeans</option>
              </select>

              <div>
                <p>Max Price: ₹{maxPrice}</p>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((product) => {
          const imgs =
            product.images?.length > 0
              ? product.images
              : [product.image];

          const current = imageIndex[product._id] || 0;

          return (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate("/product", { state: { product } })
                }
              >
                <div className="overflow-hidden h-40 rounded">
                  <div
                    className="flex transition-transform duration-700"
                    style={{
                      transform: `translateX(-${current * 100}%)`,
                    }}
                  >
                    {imgs.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`img-${i}`}
                        className="w-full h-40 object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>

              {/* 🔥 SELLER CONTROLS */}
              {role === "seller" && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/seller", { state: { product } })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
