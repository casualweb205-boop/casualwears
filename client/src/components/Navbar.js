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
    <nav className="bg-black text-white px-4 py-3 flex flex-col md:flex-row items-center justify-between">

      {/* TOP ROW (MOBILE) / LEFT (DESKTOP) */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm md:text-base">
        <Link to="/" className="hover:text-gray-300">Home</Link>

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

      {/* CENTER LOGO */}
      <div className="my-2 md:my-0">
        <ParticleText />
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 text-sm md:text-base">
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
