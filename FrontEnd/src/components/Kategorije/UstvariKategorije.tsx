import React, { useState } from "react";
import axios from "axios";
import { Kategorija } from "../../types/types";
import "../../styles/container.css";

interface UstvariKategorijeProps {
  fetchKategorije: () => void;
}

const UstvariKategorije: React.FC<UstvariKategorijeProps> = ({ fetchKategorije }) => {
  const [formData, setFormData] = useState<Partial<Kategorija>>({ naziv: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/routes.php?action=dodajKategorijo",
        { naziv: formData.naziv },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        alert("Kategorija uspešno dodana!");
        setFormData({ naziv: "" });
        fetchKategorije(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error creating kategorija:", error);
        alert("Neuspešno dodana kategorija.");
      });
  };

  return (
    <div className="containerspan">
      <h2>Ustvari novo kategorijo:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Naziv: &nbsp;
            <input
              type="text"
              name="naziv"
              value={formData.naziv || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button className="dodaj" type="submit">
          Dodaj Kategorijo
        </button>
      </form>
    </div>
  );
};

export default UstvariKategorije;
