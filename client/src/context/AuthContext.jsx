import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";



const AuthContext = createContext();

// Avoid the need to use useContext(AuthContext) directly in every component, just use useAuth() instead.
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [isNewUser, setIsNewUser] = useState(
    JSON.parse(localStorage.getItem("isNewUser")) || false
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("userName")) || ""
  );
  const [team, setTeam] = useState(null);

  useEffect(() => {
    // Persist isAuthenticated to localStorage whenever it changes
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    // Persist userEmail to localStorage whenever it changes
    localStorage.setItem("userEmail", userEmail);
    // Persist isNewUser to localStorage whenever it changes
    localStorage.setItem("isNewUser", isNewUser);
    // Persist userName to localStorage whenever it changes
    localStorage.setItem("userName", JSON.stringify(userName));
    // Persist team to localStorage whenever it changes
    localStorage.setItem("team", JSON.stringify(team));
  }, [isAuthenticated, userEmail, isNewUser, userName, team]);

  const login = async (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    try {
      //Check if the user is new
      const response = await axios.post("/api/player/checkLogin", {
        email,
      });
      console.log(response);
      if (response.data.isNewUser === false) {
        setUserName(response.data.username);
      }
      setIsNewUser(response.data.isNewUser);
    } catch (error) {
      console.error("Error checking login", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setIsNewUser(true);
    setUserName("");
    // Optionally clear persisted state on logout
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  };

  const values = {
    isAuthenticated,
    userEmail,
    isNewUser,
    login,
    logout,
    setIsNewUser,
    userName,
    setUserName,
    team,
    setTeam,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
