import { useState } from "react";
import axios from "axios";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Project created successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-[#05070d] via-[#0a0f1e] to-black">
      <div className="max-w-xl bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full p-3 rounded bg-black/40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 rounded bg-black/40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded font-medium hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProject;