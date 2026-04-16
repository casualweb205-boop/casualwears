import { Link, useNavigate } from "react-router-dom";
import ParticleText from "./ParticleText";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between relative">

      {/* LEFT */}
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>

        {/* 🔥 HIDE CART FOR SELLER */}
        {role !== "seller" && (
          <Link to="/cart" className="hover:text-gray-300">
            Cart 🛒
          </Link>
        )}

        <Link to="/orders" className="hover:text-gray-300">
          Orders 📦
        </Link>

        {role === "seller" && (
          <Link to="/seller" className="hover:text-gray-300">
            Seller
          </Link>
        )}
      </div>

      {/* CENTER */}
<div className="absolute left-1/2 transform -translate-x-1/2">
  <ParticleText />
</div>

      {/* RIGHT */}
      <div className="space-x-4">
        {token ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;