import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
  adminLogin: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("@Project:email"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("@Project:email") === "admin@gmail.com");

  const login = (email: string) => {
    localStorage.setItem("@Project:email", email);
    setIsLoggedIn(true);
    setIsAdmin(email === "admin@gmail.com"); // Set isAdmin based on email
  };

  const adminLogin = () => {
    const adminEmail = "admin@gmail.com";
    localStorage.setItem("@Project:email", adminEmail);
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("@Project:email");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
