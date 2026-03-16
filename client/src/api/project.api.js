import api from "./Axios.js";

// get all projects
export const getProjects = async () => {
  const res = await api.get("api/projects");
  return res.data;
};

// create project (admin)
export const createProject = async (data) => {
  const res = await api.post("api/projects", data);
  return res.data;
};
