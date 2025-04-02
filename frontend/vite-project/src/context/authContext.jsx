import { createContext, useState, useEffect } from "react";
import axios from "axios";
import React from "react";
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs,{
      withCredentials:true,
    });
   // localStorage.setItem("access_token", res.data);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user"); // Ensure localStorage is cleared on logout
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ login , logout , currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
