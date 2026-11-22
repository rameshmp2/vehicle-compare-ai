import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // App eka load wenakota session eka thiyenawada balanna
    useEffect(() => {
        api
            .get("/api/user")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/login", { email, password });
        const { data } = await api.get("/api/user");
        setUser(data);
    };

    const register = async (form) => {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/register", form);
        const { data } = await api.get("/api/user");
        setUser(data);
    };

    const logout = async () => {
        await api.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);