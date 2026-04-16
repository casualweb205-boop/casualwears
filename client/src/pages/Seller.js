import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Seller() {
  const { state } = useLocation();
  const navigate = useNavigate(); // 🔥 NEW

  const editingProduct = state?.product;

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: ["", "", ""],
    stock: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    },
  });

  // PREFILL
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        images: editingProduct.images || ["", "", ""],
        stock: editingProduct.stock || {
          S: 0,
          M: 0,
          L: 0,
          XL: 0,
        },
      });
    }
  }, [editingProduct]);

  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const handleStockChange = (size, value) => {
    setForm({
      ...form,
      stock: {
        ...form.stock,
        [size]: Number(value),
      },
    });
  };

  const handleSubmit = async () => {
    const url = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct._id}`
      : "http://localhost:5000/api/products/add";

    const method = editingProduct ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert(editingProduct ? "Product updated" : "Product added");

    // 🔥 REDIRECT TO HOME
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {editingProduct ? "Edit Product ✏️" : "Add Product 🛍️"}
      </h1>

      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        value={form.price}
        placeholder="Price"
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        value={form.description}
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="w-full p-2 mb-4 border rounded"
      />

      {/* IMAGES */}
      <h3 className="font-semibold mb-2">Images</h3>

      {form.images.map((img, i) => (
        <input
          key={i}
          value={img}
          placeholder={`Image ${i + 1}`}
          onChange={(e) =>
            handleImageChange(i, e.target.value)
          }
          className="w-full p-2 mb-2 border rounded"
        />
      ))}

      {/* STOCK */}
      <h3 className="font-semibold mt-4 mb-2">Stock</h3>

      {["S", "M", "L", "XL"].map((size) => (
        <div key={size} className="flex gap-2 mb-2">
          <label className="w-10">{size}</label>
          <input
            type="number"
            value={form.stock[size]}
            onChange={(e) =>
              handleStockChange(size, e.target.value)
            }
            className="p-2 border rounded"
          />
        </div>
      ))}

      <button onClick={handleSubmit} className="btn mt-4">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}

export default Seller;