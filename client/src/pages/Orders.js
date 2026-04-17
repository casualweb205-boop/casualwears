import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role")?.trim().toLowerCase();

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
    await fetch(`https://casualwears.onrender.com/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadOrders();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders 📦</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">

          <p>Status: {order.status || "Pending"}</p>

          {role === "seller" && (
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          )}

          {order.items.map((item, i) => (
            <div key={i}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
