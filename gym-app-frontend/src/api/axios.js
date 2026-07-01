import axios from "axios";

/* ==========================================
   API CONFIGURATION
========================================== */

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "https://fitness-1-1.onrender.com/api",

    timeout: 30000,

    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

    withCredentials: false,
});

/* ==========================================
   REQUEST INTERCEPTOR
========================================== */

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("=================================");
        console.log("API REQUEST");
        console.log("URL:", config.baseURL + config.url);
        console.log("METHOD:", config.method);
        console.log("DATA:", config.data);
        console.log("=================================");

        return config;
    },
    (error) => Promise.reject(error)
);

/* ==========================================
   RESPONSE INTERCEPTOR
========================================== */

api.interceptors.response.use(
    (response) => {
        console.log("=================================");
        console.log("API RESPONSE");
        console.log(response.data);
        console.log("=================================");

        return response;
    },
    (error) => {
        console.log("=================================");
        console.log("API ERROR");

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);

            if (error.response.status === 401) {
                localStorage.removeItem("token");
            }

        } else if (error.request) {
            console.log("No response received.");
            console.log(error.request);
        } else {
            console.log(error.message);
        }

        console.log("=================================");

        return Promise.reject(error);
    }
);

export default api;
