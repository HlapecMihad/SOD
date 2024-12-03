import React, { useState } from "react";
import axios from "axios";
import { Oglas, Kategorija } from "../../types/types";
import "../../styles/container.css";

interface UstvariOglasProps {
  fetchOglas: () => void;
}

const UstvariOglas: React.FC<UstvariOglasProps> = ({ fetchOglas }) => {
  const [formData, setFormData] = useState<Partial<Oglas>>({
    text: "",
    datumObjave: "",
  });
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch categories
  useState(() => {
    axios
      .get("http://localhost:8000/routes.php", { params: { action: "vrniKategorije" } })
      .then((response) => {
        setKategorije(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories.");
      });
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    const email = localStorage.getItem("@Project:email");
    if (!email) {
      alert("Uporabnik ni prijavljen.");
      return;
    }

    axios
      .post(
        "http://localhost:8000/routes.php?action=dodajOglas",
        {
          text: formData.text,
          datumObjave: formData.datumObjave,
          id_kategorije: selectedCategory,
          id_uporabnika: email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        alert("Oglas uspešno dodan!");
        setFormData({ text: "", datumObjave: "" });
        setSelectedCategory(null);
        fetchOglas(); // Refresh oglas list
      })
      .catch(() => {
        alert("Failed to add oglas.");
      });
  };

  return (
    <div className="containerspan">
      <h2>Ustvari nov oglas:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text: &nbsp;
            <textarea
              name="text"
              value={formData.text || ""}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Datum Objave: &nbsp;
            <input
              type="date"
              name="datumObjave"
              value={formData.datumObjave || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Kategorija: &nbsp;
            <select
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Izberite kategorijo
              </option>
              {kategorije.map((kategorija) => (
                <option key={kategorija.id_kategorije} value={kategorija.id_kategorije}>
                  {kategorija.naziv}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="dodaj" type="submit">Dodaj Oglas</button>
      </form>
    </div>
  );
};

export default UstvariOglas;
