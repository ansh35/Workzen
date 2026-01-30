import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasksByProject, updateTaskStatus } from "../api/task.api";
import KanbanColumn from "../componets/kanban.jsx";

function ProjectDetails() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status: newStatus } : t
        )
      );
    } catch {
      alert("Failed to update task status");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasksByProject(projectId);

        const normalizedTasks = response.tasks.map(task => ({
          ...task,
          status: task.status?.toLowerCase().trim(),
        }));

        setTasks(normalizedTasks);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchTasks();
  }, [projectId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading project tasks...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Project Tasks</h2>
        <p className="text-gray-400 mt-1">
          Track progress across all stages
        </p>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn
          title="Todo"
          status="to-do"
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
        <KanbanColumn
          title="Done"
          status="done"
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default ProjectDetails;
