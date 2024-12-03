import React, { useState } from "react";
import axios from "axios";
import { Uporabnik } from "../../types/types";
import "../../styles/container.css";
import "../../styles/containerMain.css";
import { useNavigate } from "react-router-dom";

const UstvariUporabnika: React.FC = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Uporabnik>>({
    ime: "",
    priimek: "",
    mail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log to kar je poslano na backend v console
    console.log("Sending data:", {
      ime: formData.ime,
      priimek: formData.priimek,
      mail: formData.mail,
      password: formData.password,
    });

    axios
      .post(
        "http://localhost:8000/routes.php?action=dodajUporabnika",
        {
          ime: formData.ime,
          priimek: formData.priimek,
          mail: formData.mail,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message || "Uporabnik uspesno dodan!");
        navigate("/login");
        setFormData({ ime: "", priimek: "", mail: "", password: "" });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Failed to create user.");
      });
  };

  return (
   <div className="parent">
   <div className="child">
    <div className="containerspan">
      <h1 className="uporabnikispan">Registracija</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Ime: &nbsp;
            <input
              type="text"
              name="ime"
              placeholder="Vnesite ime"
              value={formData.ime || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Priimek: &nbsp;
            <input
              type="text"
              name="priimek"
              placeholder="Vnesite priimek"
              value={formData.priimek || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mail: &nbsp;
            <input
              type="email"
              name="mail"
              placeholder="npr. joe.doe@gmail.com"
              value={formData.mail || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password: &nbsp;
            <input
              type="password"
              name="password"
              placeholder="Vnesite geslo"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button className="dodaj" type="submit">Ustvari uporabnika</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default UstvariUporabnika;
