import axios from "axios";

// Use a relative base URL by default so the dev server proxy can forward
// requests to the backend. For production set `VITE_API_URL` to the full API URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ""
});

// allow sending cookies/credentials if backend requires them
api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
