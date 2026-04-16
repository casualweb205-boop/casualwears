import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-white text-4xl">✔</span>
      </div>

      <h1 className="text-3xl font-bold text-green-600 mt-6">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mt-2">
        Your order is being processed 🚚
      </p>

      <button onClick={() => navigate("/")} className="btn mt-6">
        Go to Home
      </button>
    </div>
  );
}

export default OrderSuccess;