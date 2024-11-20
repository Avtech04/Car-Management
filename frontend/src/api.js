import axios from "axios";

const api = axios.create({
    baseURL: "http://car-management.ap-south-1.elasticbeanstalk.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
