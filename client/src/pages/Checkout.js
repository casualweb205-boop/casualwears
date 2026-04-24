import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import qr from "../assets/qr.jpeg";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [payment, setPayment] = useState("cod");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePhoneChange = (e) => {
    // allow only digits
    const value = e.target.value.replace(/\D/g, "");

    // limit to 10 digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const placeOrder = async () => {
    if (!address || !phone) {
      alert("Please enter address and phone number");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const userId = localStorage.getItem("userId");

    const res = await fetch("https://casualwears.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        items: cart,
        total,
        paymentMethod: payment,
        address,
        phone: `${countryCode} ${phone}`,
      }),
    });

    await res.json();

    clearCart();
    navigate("/success");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout 💳</h1>

      <h2 className="mb-4">Total: ₹{total}</h2>

      {/* ADDRESS */}
      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      {/* PHONE */}
      <div className="flex gap-2 mb-4">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+971">🇦🇪 +971</option>
        </select>

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={handlePhoneChange}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block">
          <input
            type="radio"
            value="cod"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Cash on Delivery
        </label>

        <label className="block mt-2">
          <input
            type="radio"
            value="online"
            checked={payment === "online"}
            onChange={() => setPayment("online")}
          />
          UPI Payment
        </label>
      </div>

      {payment === "cod" ? (
        <button onClick={placeOrder} className="btn">
          Place Order
        </button>
      ) : (
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="mb-2 font-semibold">Scan & Pay via UPI</p>

          <img src={qr} alt="UPI QR" className="mx-auto w-48 h-48" />

          <button onClick={placeOrder} className="btn mt-4">
            I Have Paid
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
