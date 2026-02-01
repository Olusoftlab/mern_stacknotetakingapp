import axios from "axios";

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "/api"

const api = axios.create({ baseUrl })

export default api