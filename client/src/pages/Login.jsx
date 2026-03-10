import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/Axios";
import AuthLayout from "../Layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("api/auth/login", { email, password });

      login(res.data.token, res.data.user);

      // role-based redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-3">
          ⚡
        </div>
        <h2 className="text-xl font-semibold">Welcome Dev!</h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          Sign in to continue to <span className="font-semibold">Workzen</span>
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* show/hide toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* forgot password */}
        <div className="text-right">
          <span
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-md font-medium disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* footer */}
      <p className="text-sm text-center text-gray-500 mt-6">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 font-medium cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </AuthLayout>
  );
}

export default Login;
