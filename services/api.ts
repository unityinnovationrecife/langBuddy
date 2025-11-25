import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

// Interceptor para enviar token automaticamente
api.interceptors.request.use(
  (config) => {
    // Garante que só roda no client (Next.js)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
