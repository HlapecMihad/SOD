import React, { useEffect, useState } from "react";
import axios from "axios";
import { Kategorija } from "../../types/types";
import "../../styles/container.css";

const PrikaziKategorije: React.FC = () => {
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [error, setError] = useState<string | null>(null);

  function fetchKategorije() {
   axios
     .get("http://localhost:8000/routes.php", {
       params: {
         action: "vrniKategorije",
       },
     })
     .then(function (response) {
      console.log(response.data);
       setKategorije(response.data.data || []);
     })
     .catch(function (error) {
       console.error("Error fetching users:", error);
       setError("Failed to fetch users. Check your backend connection.");
     });
 }

 const handleDelete = (id: number) => {
   if (window.confirm("Izbrisi kategorijo?")) {
     console.log("Sending data to backend:", {
       id_kategorije: id,
     });
 
     axios
       .delete("http://localhost:8000/routes.php", {
         data: {
           id_kategorije: id,
         },
         headers: {
           "Content-Type": "application/json",
         },
         params: {
           action: "izbrisiKategorijo",
         },
       })
       .then(() => {
         alert("Kategorija uspesno izbrisana!");
         fetchKategorije();
       })
       .catch((error) => {
         console.error("Error deleting kategorija:", error);
         alert("Failed to delete kategorija.");
       });
   }
 };
 

 useEffect(() => {
   fetchKategorije();
 }, []);
 

  return (
    <div className="container">
      <h2>Seznam Kategorij:</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : kategorije.length === 0 ? (
        <p>Nobena kategorija ni bila najdena.</p>
      ) : (
        <ul>
          {kategorije.map((kategorija) => (
            <li key={kategorija.id_kategorije} className="container">
               <span>
                  {kategorija.naziv}
               </span>
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
      )}
    </div>
  );
};

export default PrikaziKategorije;
