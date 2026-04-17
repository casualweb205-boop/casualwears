import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");

      let url = "https://casualwears.onrender.com/api/orders";

      if (role === "seller") {
        url += "?role=seller";
      } else {
        url += `?userId=${userId}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(
      `https://casualwears.onrender.com/api/orders/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    alert("Status updated");
    loadOrders();
  };

  const addReview = async (orderId, index) => {
    const review = prompt("Write your review:");
    const rating = parseInt(prompt("Rate (1-5):"));

    if (!review || !rating || rating < 1 || rating > 5) {
      alert("Invalid input");
      return;
    }

    const userId = localStorage.getItem("userId");

    await fetch("https://casualwears.onrender.com/api/orders/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        itemIndex: index,
        review,
        rating,
        userId,
      }),
    });

    loadOrders();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders 📦</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">

          <p className="font-semibold mb-2">
            Status:{" "}
            <span
              className={
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Shipped"
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            >
              {order.status}
            </span>
          </p>

          {role === "seller" && (
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border p-1 mb-3"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          )}

          {order.items.map((item, index) => (
            <div key={index} className="mb-3 border-b pb-2 flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16"
              />

              <div>
                <p>{item.name}</p>

                {role !== "seller" && (
                  <p className="text-sm text-gray-600">
                    Tracking: {order.status}
                  </p>
                )}

                {role !== "seller" && !item.review && (
                  <button
                    onClick={() => addReview(order._id, index)}
                    className="btn mt-2"
                  >
                    Add Review
                  </button>
                )}

                {item.review && (
                  <div>
                    <p>⭐ {item.rating}/5</p>
                    <p>{item.review}</p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
