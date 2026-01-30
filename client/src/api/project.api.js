import api from "./Axios.js";

// get all projects
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// create project (admin)
export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};
