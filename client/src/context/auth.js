import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // Set default axios Authorization header
    useEffect(() => {
        if (auth?.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [auth?.token]);

    // Load auth data from localStorage on initial render
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                user: parsedData.user,
                token: parsedData.token,
            });
        }
    }, []); // Empty dependency array to run only on mount

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
