import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {motion} from 'framer-motion';


function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      setTimeout(() =>{
      navigate("/login");},800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90" />

      {/* animated card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl"
      >
        {/* header */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-3"
          >
            ⚡
          </motion.div>

          <h2 className="text-xl font-semibold">Create Account</h2>
          <p className="text-sm text-gray-400 text-center mt-1">
            Join Workzen and start working
          </p>
        </div>

        {/* error animation */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* name */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* email */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* password */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* role */}
          <motion.select
            whileFocus={{ scale: 1.03 }}
            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </motion.select>

          {/* submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
;
}

export default Register;
