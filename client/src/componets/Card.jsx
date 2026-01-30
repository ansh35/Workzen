function TaskCard({ task, onStatusChange }) {
  return (
    <div
      className="
        bg-black/50
        border border-white/10
        p-4
        rounded-xl
        shadow-sm
        hover:border-indigo-500/40
        transition-all
      "
    >
      {/* TITLE */}
      <h4 className="font-semibold text-white mb-2">
        {task.title}
      </h4>

      {/* STATUS DROPDOWN */}
      <select
        value={task.status}
        onChange={(e) =>
          onStatusChange(task._id, e.target.value)
        }
        className="
          w-full
          bg-black/70
          text-white
          text-sm
          border border-white/10
          rounded-md
          px-2 py-1
          focus:outline-none
          focus:border-indigo-500
        "
      >
        <option value="to-do">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskCard;
