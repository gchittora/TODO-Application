import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchTasks = () => API.get("/api/tasks");
export const createTask = (task) => API.post("/api/tasks", task);
export const updateTaskStatus = (id, status) => API.patch(`/api/tasks/${id}`, { status });
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);
export const registerUser = (user) => API.post("/api/auth/register", user);
export const loginUser = (user) => API.post("/api/auth/login", user);
