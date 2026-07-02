import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
    };

    const register = async (data) => {
    const res = await fetch(
        "https://fitness-1-1.onrender.com/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message);
    }

    localStorage.setItem("token", result.token);
    setUser(result.user);
};

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const loadUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
