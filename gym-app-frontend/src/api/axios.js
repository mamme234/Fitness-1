import axios from "axios";

/**
 * ============================
 * API CONFIGURATION
 * ============================
 */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://fitness-1-1.onrender.com/api",
    timeout: 30000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/**
 * ============================
 * REQUEST INTERCEPTOR
 * ============================
 */

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * ============================
 * RESPONSE INTERCEPTOR
 * ============================
 */

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.warn("Unauthorized");
                    localStorage.removeItem("token");
                    break;

                case 403:
                    console.warn("Forbidden");
                    break;

                case 404:
                    console.warn("API endpoint not found");
                    break;

                case 500:
                    console.warn("Server error");
                    break;

                default:
                    console.warn(error.response.data?.message || "API Error");
            }
        } else if (error.request) {
            console.warn("Cannot connect to server");
        } else {
            console.warn(error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
