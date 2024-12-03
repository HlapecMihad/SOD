import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oglas, Kategorija } from "../../types/types";
import "../../styles/container.css";
import { useAuth } from "../Uporabnik/AuthContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface PrikaziOglasProps {
  oglas: Oglas[];
  fetchOglas: () => void;
}

const PrikaziOglas: React.FC<PrikaziOglasProps> = ({ oglas, fetchOglas }) => {
  const [filteredOglas, setFilteredOglas] = useState<Oglas[]>(oglas);
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();
  const [isSortedAscending, setIsSortedAscending] = useState<boolean>(true);

  // Get logged-in user's email
  const userEmail = localStorage.getItem("@Project:email");

  // Synchronize `filteredOglas` with `oglas` prop
  useEffect(() => {
    setFilteredOglas(oglas);
  }, [oglas]);

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

  // Filter oglas by category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNaziv = e.target.value;
    setSelectedCategory(selectedNaziv);

    if (selectedNaziv) {
      setFilteredOglas(oglas.filter((o) => o.kategorija_naziv === selectedNaziv));
    } else {
      setFilteredOglas(oglas);
    }
  };

  // Sort oglas by datumObjave
  const handleSortByDate = () => {
    const sortedOglas = [...filteredOglas].sort((a, b) => {
      const dateA = new Date(a.datumObjave).getTime();
      const dateB = new Date(b.datumObjave).getTime();
      return isSortedAscending ? dateA - dateB : dateB - dateA;
    });
    setFilteredOglas(sortedOglas);
    setIsSortedAscending(!isSortedAscending);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Izbriši oglas?")) {
      axios
        .delete("http://localhost:8000/routes.php", {
          data: { id_oglas: id },
          headers: { "Content-Type": "application/json" },
          params: { action: "izbrisiOglas" },
        })
        .then(() => {
          alert("Oglas uspešno izbrisan!");
          fetchOglas();
        })
        .catch((error) => {
          console.error("Error deleting oglas:", error);
          alert("Failed to delete oglas.");
        });
    }
  };

  // Check if delete button should be shown
  const canDelete = (creatorEmail: string) => {
    return userEmail === "admin@gmail.com" || userEmail === creatorEmail;
  };

  return (
    <div>
      <div>
        <label>
          Filtriraj po kategoriji:
          <select
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px" }}
          >
            <option value="">Vse kategorije</option>
            {kategorije.map((kategorija) => (
              <option key={kategorija.id_kategorije} value={kategorija.naziv}>
                {kategorija.naziv}
              </option>
            ))}
          </select>
        </label>
        <button className="mt2"
          onClick={handleSortByDate}
          style={{
            marginLeft: "20px",
            marginTop: "5px",
            padding: "2px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isSortedAscending ? (
            <>
              Datum Objave <KeyboardArrowUpIcon />
            </>
          ) : (
            <>
              Datum Objave <KeyboardArrowDownIcon />
            </>
          )}
        </button>
      </div>

      <p style={{ marginTop: "10px" }}>
        Število oglasov: <strong>{filteredOglas.length}</strong>
      </p>

      {filteredOglas.length === 0 ? (
        <p>Noben oglas ni bil najden.</p>
      ) : (
        <ul className="container-main">
          {filteredOglas.map((oglasi) => (
            <li key={oglasi.id_oglas} className="container">
              <span className="span">
                <strong>{oglasi.ime} {oglasi.priimek}</strong>
              </span>
              <span className="span">
                <strong>Text:</strong> {oglasi.text}
              </span>
              <span className="span">
                <strong>Datum Objave:</strong> {oglasi.datumObjave}
              </span>
              <span className="span">
                <strong>Kategorija:</strong> {oglasi.kategorija_naziv}
              </span>
              {isLoggedIn && canDelete(oglasi.mail) && (
                <button
                  onClick={() => handleDelete(oglasi.id_oglas)}
                  style={{
                    marginLeft: "2px",
                    marginTop: "3px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Odstrani
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrikaziOglas;
