import React from "react";

const LoggedInUser: React.FC = () => {
  const email = localStorage.getItem("@Project:email");

  if (!email) {
    return null;
  }

  const handleLogout = () => {
   localStorage.removeItem("@Project:email");

   //navigate("/login");
 };

  return (
    <div>
      <p>
        <strong>Logged in as:</strong> {email}
      </p>
      <button onClick={handleLogout}>
         Odjava
      </button>
    </div>
  );
};

export default LoggedInUser;
