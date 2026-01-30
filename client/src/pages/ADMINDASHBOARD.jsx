import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-8 py-8 text-white bg-gradient-to-br from-[#05070d] via-[#0a0f1e] to-black">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Manage tasks, projects, and users
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        
        {/* ADD TASK */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition">
          <h2 className="text-lg font-semibold mb-1">Add Task</h2>
          <p className="text-sm text-gray-400 mb-5">
            Create and assign tasks to team members
          </p>

          <button
            onClick={() => navigate("/admin/add-task")}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium"
          >
            Go to Add Task →
          </button>
        </div>

        {/* ADD PROJECT (NEXT STEP) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 opacity-70">
          <h2 className="text-lg font-semibold mb-1">Add Project</h2>
          <p className="text-sm text-gray-400 mb-5">
            Create projects for your team
          </p>

          <button
            disabled
            className="bg-gray-700 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>

        {/* USERS */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 opacity-70">
          <h2 className="text-lg font-semibold mb-1">Users</h2>
          <p className="text-sm text-gray-400 mb-5">
            Manage team members
          </p>

          <button
            disabled
            className="bg-gray-700 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
