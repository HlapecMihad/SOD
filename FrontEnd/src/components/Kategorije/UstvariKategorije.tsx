import React, { useState } from "react";
import axios from "axios";
import { Kategorija } from "../../types/types";
import "../../styles/container.css";

const UstvariKategorije: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Kategorija>>({
    naziv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log what is being sent to the console
    console.log("Sending data:", {
      naziv: formData.naziv,
    });

    axios
      .post(
        "http://localhost:8000/routes.php?action=dodajKategorijo",
        {
          naziv: formData.naziv,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message || "Kategorija uspesno dodana!");
        setFormData({ naziv: ""});
      })
      .catch((error) => {
        console.error("Error creating kategorija:", error);
        alert("Neuspesno dodana kategorija.");
      });
  };

  return (
    <div className="container">
      <h2>Ustvari novo kategorijo:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Naziv:
            <input
              type="text"
              name="naziv"
              value={formData.naziv || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Dodaj Kategorijo</button>
      </form>
    </div>
  );
};

export default UstvariKategorije;
