import axios from "axios";

const API = axios.create({
  baseURL: "https://student-health-backend-qtvu.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add Authorization header from localStorage if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;