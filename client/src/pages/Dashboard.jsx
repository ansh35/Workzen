import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../api/project.api.js";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your workspace...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your projects and tasks
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard title="Projects" value={projects.length} />
        <StatCard title="Status" value="Active" />
        <StatCard title="Workspace" value="Workzen" />
      </div>

      {/* PROJECTS */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">
          Your Projects
        </h2>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-2xl text-center text-gray-400">
          <p className="text-lg font-medium">
            No projects yet
          </p>
          <p className="text-sm mt-1">
            Projects you create will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
              className="
                group cursor-pointer
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-6
                hover:border-indigo-500/50
                hover:-translate-y-1
                hover:shadow-xl hover:shadow-indigo-500/10
                transition-all duration-300
              "
            >
              <h3 className="text-lg font-semibold group-hover:text-indigo-400">
                {project.title}
              </h3>

              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {project.description || "No description provided"}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium">
                  Active
                </span>

                <span className="text-xs text-gray-400 group-hover:text-indigo-400 transition">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- STAT CARD ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-white">
        {value}
      </h3>
    </div>
  );
}

export default Dashboard;
