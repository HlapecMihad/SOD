import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oglas, Kategorija } from "../../types/types";
import "../../styles/container.css";

const UstvariOglas: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Oglas>>({
    text: "",
    datumObjave: "",
  });
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/routes.php", {
        params: { action: "vrniKategorije" },
      })
      .then((response) => {
        setKategorije(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories.");
      });
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    console.log("Sending data:", {
      text: formData.text,
      datumObjave: formData.datumObjave,
      id_kategorije: selectedCategory,
    });

    axios
      .post(
        "http://localhost:8000/routes.php?action=dodajOglas",
        {
          text: formData.text,
          datumObjave: formData.datumObjave,
          id_kategorije: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message || "Oglas uspesno dodan!");
        setFormData({ text: "", datumObjave: "" });
        setSelectedCategory(null); // Reset the category
      })
      .catch((error) => {
        console.error("Error creating oglas:", error);
        alert("Neuspesno dodan oglas.");
      });
  };

  return (
    <div className="container">
      <h2>Ustvari nov oglas:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text:
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
            Datum Objave:
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
            Kategorija:
            <select
              value={selectedCategory || ""}
              onChange={handleCategoryChange}
              style={{ backgroundColor: selectedCategory ? "#242424" : "#303030" }}
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
        <button type="submit">Dodaj Oglas</button>
      </form>
    </div>
  );
};

export default UstvariOglas;
