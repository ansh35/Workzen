import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/Axios";
import AuthLayout from "../layouts/AuthLayout";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(
        `api/auth/reset-password/${token}`,
        { password }
      );

      setSuccess("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold text-center mb-4">
        Reset Password
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}

      {success && (
        <p className="text-green-500 text-sm text-center mb-3">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full px-4 py-3 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full px-4 py-3 border rounded-md"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
