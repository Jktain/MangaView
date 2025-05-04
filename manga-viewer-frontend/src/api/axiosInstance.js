import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7290/api", // заміни на свій бекенд, якщо треба
});

// Інтерцептор для додавання токена
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
