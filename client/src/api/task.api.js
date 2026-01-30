import api from "./Axios";

export const getTasksByProject = async (projectId) => {
  const res = await api.get(`/tasks/project/${projectId.trim()}`);
  return res.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await api.patch(`/tasks/${taskId}`, { status });
  return res.data;
};
