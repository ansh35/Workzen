import { useEffect, useState } from "react";
import axios from "axios";
console.log("AddTask rendered");
function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("to-do");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 fetch projects & users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProjects(projectRes.data.projects);
        setUsers(userRes.data.users);
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [token]);

  // 🔹 submit task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          project,
          assignedTo,
          priority,
          status
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Task created successfully");

      setTitle("");
      setDescription("");
      setProject("");
      setAssignedTo("");
      setPriority("Medium");
      setStatus("to-do");
    } catch (err) {
      setError(err.response?.data?.message || "Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#05070d] via-[#0a0f1e] to-black text-white">
    
    <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add New Task</h2>
        <p className="text-sm text-gray-400 mt-1">
          Create and assign tasks to your team
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Project */}
        <select
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* Assign */}
        <select
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to member</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Status */}
        <select
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition py-3 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  </div>
);

}

export default AddTask;
