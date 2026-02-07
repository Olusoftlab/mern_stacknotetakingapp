import axios from "axios";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "/api"

const api = axios.create({ baseURL })

export default api