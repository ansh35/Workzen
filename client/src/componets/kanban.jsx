import TaskCard from "./Card.jsx";

function KanbanColumn({
  title,
  status,
  tasks,
  onStatusChange,
  onTaskClick,   // ✅ NEW PROP
}) {
  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div
      className="
        rounded-2xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        p-5
        min-h-[420px]
      "
    >
      {/* COLUMN HEADER */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        <div className="mt-2 h-[2px] w-10 bg-indigo-500 rounded" />
      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <p className="text-sm text-gray-500">No tasks</p>
      )}

      {/* TASKS */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusChange={onStatusChange}
            onClick={() => onTaskClick(task)}  // ✅ PASS CLICK
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;