/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { isUserLoggedIn } from "./accountApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState();

    // This runs on initial render only
    useEffect(() => {
        async function initilizeUser() {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");
            if (storedUser && storedToken) {
                // Check if the user is still valid
                const isValidUser = await isUserLoggedIn(storedToken, storedUser);
                if (isValidUser) {
                    setCurrentUser(storedUser);
                    setToken(storedToken);
                    setIsLoggedIn(true);
                    return;
                }
            }

            // Will clean the user if we get here
            setIsLoggedIn(false);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }

        initilizeUser();
    }, []);

    // Updates local storage whenever user detail changes
    useEffect(() => {
        if (token && currentUser) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", currentUser);
        }
    }, [currentUser, token]);



    // setToken, setIsLoggedIn, isLoggedIn, setCurrentUser
    return (
        <AuthContext.Provider value={{ currentUser, token, isLoggedIn, setCurrentUser, setToken, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};