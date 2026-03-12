import axios from "axios";

const API = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/"
  baseURL: "https://hrms-backend-zo4e.onrender.com/api/"
});

export default API;