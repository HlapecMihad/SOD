import React from "react";
import axios from "axios";
import { Kategorija } from "../../types/types";
import "../../styles/container.css";

interface PrikaziKategorijeProps {
  kategorije: Kategorija[];
  fetchKategorije: () => void;
}

const PrikaziKategorije: React.FC<PrikaziKategorijeProps> = ({ kategorije, fetchKategorije }) => {
  const handleDelete = (id: number) => {
    if (window.confirm("Izbriši kategorijo?")) {
      axios
        .delete("http://localhost:8000/routes.php", {
          data: { id_kategorije: id },
          headers: { "Content-Type": "application/json" },
          params: { action: "izbrisiKategorijo" },
        })
        .then(() => {
          alert("Kategorija uspešno izbrisana!");
          fetchKategorije(); // Refresh the list
        })
        .catch((error) => {
          console.error("Error deleting kategorija:", error);
          alert("Failed to delete kategorija.");
        });
    }
  };

  return (
    <div>
      {kategorije.length === 0 ? (
        <p>Nobena kategorija ni bila najdena.</p>
      ) : (
         <>
         <p style={{ marginTop: "10px" }}>
         Število kategorij: <strong>{kategorije.length}</strong>
       </p>
        <ul className="container-main">
          {kategorije.map((kategorija) => (
            <li key={kategorija.id_kategorije} className="container">
              <span className="kategorijespan">{kategorija.naziv}</span>
              <button
                onClick={() => handleDelete(kategorija.id_kategorije)}
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
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
};

export default PrikaziKategorije;
