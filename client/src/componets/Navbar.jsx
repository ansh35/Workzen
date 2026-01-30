import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#0b1220]/90 to-[#020617]/90 border-b border-white/10 px-6 py-3 flex items-center justify-between">
      
      {/* LEFT: Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer group "
        onClick={() => navigate("/dashboard")}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-blue-400/20 transition">
          <img
            src={logo}
            alt="Workzen"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <span className="text-white font-semibold text-lg tracking-wide group-hover:text-blue-400 transition">
          Workzen
        </span>
      </div>

      {/* RIGHT: Nav Links */}
      <div className="flex items-center gap-8 text-sm">
        
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`transition ${
            isActive("/dashboard")
              ? "text-blue-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Dashboard
        </Link>

        {/* Admin */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className={`transition ${
              isActive("/admin")
                ? "text-purple-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Admin
          </Link>
        )}

        {/* Divider */}
        <div className="h-5 w-px bg-white/10" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white/5 text-gray-200 border border-white/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
