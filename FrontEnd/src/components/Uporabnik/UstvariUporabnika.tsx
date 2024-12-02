import React, { useState } from "react";
import axios from "axios";
import { Uporabnik } from "../../types/types";
import "../../styles/container.css";

const UstvariUporabnika: React.FC = () => {
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

    // Log what is being sent to the console
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
        setFormData({ ime: "", priimek: "", mail: "", password: "" });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Failed to create user.");
      });
  };

  return (
    <div className="container">
      <h2>Ustvari novega uporabnika / Registracija</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Ime:
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
            Priimek:
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
            Mail:
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
            Password:
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
        <button type="submit">Ustvari uporabnika</button>
      </form>
    </div>
  );
};

export default UstvariUporabnika;
