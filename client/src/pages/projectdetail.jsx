import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasksByProject, updateTaskStatus } from "../api/task.api";
import KanbanColumn from "../componets/kanban.jsx";

function ProjectDetails() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

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
          onTaskClick={setSelectedTask}
        />
        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onTaskClick={setSelectedTask}
        />
        <KanbanColumn
          title="Done"
          status="done"
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onTaskClick={setSelectedTask}
        />
      </div>

      {/* TASK DETAIL MODAL */}
{selectedTask && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    
    <div className="bg-slate-900 border border-white/10 rounded-2xl w-[500px] p-6 relative">

      {/* Close Button */}
      <button
        onClick={() => setSelectedTask(null)}
        className="absolute top-3 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">
        {selectedTask.title}
      </h2>

      <div className="space-y-3 text-sm text-gray-300">

        <div>
          <span className="text-gray-400">Description:</span>
          <p>{selectedTask.description || "No description"}</p>
        </div>

        <div>
          <span className="text-gray-400">Priority:</span>
          <p>{selectedTask.priority}</p>
        </div>

        <div>
          <span className="text-gray-400">Status:</span>
          <p>{selectedTask.status}</p>
        </div>

        <div>
          <span className="text-gray-400">Assigned To:</span>
          <p>{selectedTask.assignedTo?.name || "Unassigned"}</p>
        </div>

        <div>
          <span className="text-gray-400">Created:</span>
          <p>
            {new Date(selectedTask.createdAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default ProjectDetails;
