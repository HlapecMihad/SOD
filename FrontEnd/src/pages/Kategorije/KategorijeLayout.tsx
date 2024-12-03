import React, { useState, useEffect } from "react";
import axios from "axios";
import PrikaziKategorije from "../../components/Kategorije/PrikaziKategorije";
import UstvariKategorije from "../../components/Kategorije/UstvariKategorije";
import "../../styles/containerMain.css";
import { Kategorija } from "../../types/types";

const KategorijeLayout: React.FC = () => {
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [showUstvariKategorije, setShowUstvariKategorije] = useState(false);

  const toggleUstvariKategorije = () => {
    setShowUstvariKategorije((prev) => !prev);
  };

  // Fetch kategorije function
  const fetchKategorije = () => {
    axios
      .get("http://localhost:8000/routes.php", { params: { action: "vrniKategorije" } })
      .then((response) => {
        setKategorije(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching kategorije:", error);
        alert("Failed to fetch kategorije. Check your backend connection.");
      });
  };

  useEffect(() => {
    fetchKategorije();
  }, []);

  return (
    <div className="parent">
      <div className="child">
        <h1 className="textCenter">Seznam Kategorij</h1>
        <div>
          <button className="buttonrightside" onClick={toggleUstvariKategorije}>
            {showUstvariKategorije ? "Skrij" : "Dodaj Kategorijo"}
          </button>
        </div>
        {showUstvariKategorije && (
          <div>
            <UstvariKategorije fetchKategorije={fetchKategorije} />
          </div>
        )}
        <div>
          <PrikaziKategorije kategorije={kategorije} fetchKategorije={fetchKategorije} />
        </div>
      </div>
    </div>
  );
};

export default KategorijeLayout;
