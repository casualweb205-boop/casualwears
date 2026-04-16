import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(
      `http://localhost:5000/api/orders?userId=${userId}&role=${role}`
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [role]);

  const addReview = async (orderId, index) => {
    const review = prompt("Write your review:");
    const rating = parseInt(prompt("Rate (1-5):"));

    if (!review || !rating || rating < 1 || rating > 5) {
      alert("Invalid input");
      return;
    }

    const userId = localStorage.getItem("userId");

    await fetch("http://localhost:5000/api/orders/review", {
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

    // reload
    const res = await fetch(
      `http://localhost:5000/api/orders?userId=${userId}&role=${role}`
    );
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders 📦</h1>

      {orders.map((order, i) => (
        <div key={i} className="bg-white p-4 mb-4 rounded shadow">

          {order.items.map((item, index) => (
            <div key={index} className="mb-3 border-b pb-2 flex gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16"
              />

              <div>
                <p>{item.name}</p>

                {/* REVIEW BUTTON */}
                {role !== "seller" && !item.review && (
                  <button
                    onClick={() => addReview(order._id, index)}
                    className="btn mt-2"
                  >
                    Add Review
                  </button>
                )}

                {/* SHOW REVIEW */}
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