import axios from "axios";

const api = axios.create({
  baseURL: "https://internshipproject-8bgi.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
