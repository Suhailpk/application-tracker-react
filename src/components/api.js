// ../api.js
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

// Create the Axios instance
const api = axios.create({
    baseURL: "http://localhost:8000", // Update the base URL to match your backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to automatically include the Authorization header
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage (or any other secure storage you use)
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // Attach the token to the Authorization header
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
