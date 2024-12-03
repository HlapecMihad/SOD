import React from "react";
import { useAuth } from "./AuthContext";

const LoggedInUser: React.FC = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  const email = localStorage.getItem("@Project:email");

  return (
    <div>
      <p>
        <strong>Prijavljen:</strong> {isAdmin ? "Admin" : email}
        <button onClick={logout}>Odjava</button>
      </p>
    </div>
  );
};

export default LoggedInUser;
