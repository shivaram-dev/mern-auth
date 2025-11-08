import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const api = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
    });

    const getAuthState = async () => {
        try {
            const {data} = await api.get('/api/auth/is-auth');
            if(data.success) {
                setIsLoggedIn(true);
                getUserData();
            }

            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await api.get("/api/user/data");
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        api
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
