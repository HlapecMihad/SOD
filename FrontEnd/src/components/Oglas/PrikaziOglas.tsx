import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oglas } from "../../types/types";
import "../../styles/container.css";

const PrikaziOglas: React.FC = () => {
  const [oglas, setOglas] = useState<Oglas[]>([]);
  const [error, setError] = useState<string | null>(null);

  function fetchOglas() {
    axios
      .get("http://localhost:8000/routes.php", {
        params: {
          action: "vrniOglas",
        },
      })
      .then(function (response) {
        console.log(response.data);
        setOglas(response.data.data || []);
      })
      .catch(function (error) {
        console.error("Error fetching oglas:", error);
        setError("Failed to fetch oglas. Check your backend connection.");
      });
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Izbrisi oglas?")) {
      console.log("Sending data to backend:", {
        id_oglas: id,
      });

      axios
        .delete("http://localhost:8000/routes.php", {
          data: {
            id_oglas: id,
          },
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            action: "izbrisiOglas",
          },
        })
        .then(() => {
          alert("Oglas uspesno izbrisan!");
          fetchOglas();
        })
        .catch((error) => {
          console.error("Error deleting oglas:", error);
          alert("Failed to delete oglas.");
        });
    }
  };

  useEffect(() => {
    fetchOglas();
  }, []);

  return (
    <div>
      <h2>Seznam Oglasov:</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : oglas.length === 0 ? (
        <p>Noben oglas ni bil najden.</p>
      ) : (
        <ul className="container-main">
          {oglas.map((oglasi) => (
            <li key={oglasi.id_oglas} className="container">
              <span><strong>Text:</strong> {oglasi.text}</span>
              <span><strong>Datum Objave:</strong> {oglasi.datumObjave}</span>
              <span><strong>Kategorija:</strong> {oglasi.kategorija_naziv}</span>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrikaziOglas;
