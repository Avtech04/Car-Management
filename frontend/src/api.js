import axios from "axios";

const api = axios.create({
    baseURL: "https://car-management-9rfx.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
