import React, { useState, useEffect } from "react";
import axios from "axios";
import PrikaziOglas from "../../components/Oglas/PrikaziOglas";
import UstvariOglas from "../../components/Oglas/UstvariOglas";
import "../../styles/containerMain.css";
import { useAuth } from "../../components/Uporabnik/AuthContext";
import { Oglas } from "../../types/types";

const OglasLayout: React.FC = () => {
  const [oglas, setOglas] = useState<Oglas[]>([]);
  const [showUstvariOglas, setShowUstvariOglas] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleUstvariOglas = () => {
    setShowUstvariOglas((prev) => !prev);
  };

  // Fetch oglas function
  const fetchOglas = () => {
    axios
      .get("http://localhost:8000/routes.php", {
        params: { action: "vrniOglas" },
      })
      .then((response) => {
        setOglas(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching oglas:", error);
        alert("Failed to fetch oglas. Check your backend connection.");
      });
  };

  useEffect(() => {
    fetchOglas();
  }, []);

  return (
    <div className="parent">
      <div className="child">
        <h1 className="textCenter">Seznam Oglasov</h1>
        {isLoggedIn && (
          <div>
            <button className="buttonrightside" onClick={toggleUstvariOglas}>
              {showUstvariOglas ? "Skrij" : "Dodaj Oglas"}
            </button>
          </div>
        )}
        {showUstvariOglas && (
          <div>
            <UstvariOglas fetchOglas={fetchOglas} />
          </div>
        )}
        <div>
          <PrikaziOglas oglas={oglas} fetchOglas={fetchOglas} />
        </div>
      </div>
    </div>
  );
};

export default OglasLayout;
