import React, { useState, useContext } from "react";
import axios from "axios";

const Login: React.FC = () => {
  //const { setUserData } = useContext(AuthContext) as AuthType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {

   console.log("Sending data:", {
      email: email,
      password: password

    });

    axios
      .post("http://localhost:8000/routes.php?action=login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          localStorage.setItem("@Project:email", email);
          alert("Uspešna prijava!");
          //setUserData({ email });
          //redirect("/");
        } else {
          alert("Neuspesna prijava!");
          setError(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
   <div className="container">
     <h2 className="title">Login</h2>
     <label className="field-name" htmlFor="email">
       Mail:
     <input
       value={email}
       id="email"
       onChange={handleEmail}
       placeholder="npr. joe.doe@gmail.com"
       onKeyDown={(e) => e.key === "Enter" && handleLogin()}
     />
     </label>
     <label className="field-name" htmlFor="password">
       Password:
     <input
       value={password}
       id="password"
       type="password"
       placeholder="Vnesite geslo"
       onChange={handlePassword}
       onKeyDown={(e) => e.key === "Enter" && handleLogin()}
     />
     </label>
     {error && <div className="error-message">{error}</div>}
     <button className="sign-in" onClick={handleLogin}>
       Prijava
     </button>
     {/*
     <p className="subtitle">
       Še nimate računa? <Link to="/register">Registracija</Link>
     </p>
     */}
 </div>
  );
};

export default Login;
