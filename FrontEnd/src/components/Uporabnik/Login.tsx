import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../../styles/containerMain.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    console.log("Sending data:", { email, password });

    axios
      .post("http://localhost:8000/routes.php?action=login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          login(email); // Update context
          alert("Uspešna prijava!");
          navigate("/");
        } else {
          alert("Neuspesna prijava!");
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
   <div className="parent">
   <div className="child">
    <div className="containerspan">
      <h1 className="uporabnikispan">Login</h1>
      <label className="field-name" htmlFor="email">
        Mail: &nbsp;
        <input 
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="npr. joe.doe@gmail.com"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </label>
      <label className="field-name" htmlFor="password">
        Password: &nbsp;
        <input
          value={password}
          id="password"
          type="password"
          placeholder="Vnesite geslo"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </label>
      {error && <div className="error-message">{error}</div>}
      <button className="dodaj" onClick={handleLogin}>
        Prijava
      </button>
      <p className="subtitle">
        Še nimate računa? <Link to="/register">Registracija</Link>
      </p>
    </div>
    </div>
    </div>
  );
};

export default Login;
