import React, { useEffect, useState } from "react";
import axios from "axios";
import { Uporabnik } from "../../types/types";
import "../../styles/container.css";

const PrikaziUporabnika: React.FC = () => {
  const [users, setUsers] = useState<Uporabnik[]>([]);
  const [error, setError] = useState<string | null>(null);

  function fetchUsers() {
   axios
     .get("http://localhost:8000/routes.php", {
       params: {
         action: "vrniUporabnike", 
       },
     })
     .then(function (response) {
      console.log(response.data);
       setUsers(response.data.data || []); 
     })
     .catch(function (error) {
       console.error("Error fetching users:", error);
       setError("Failed to fetch users. Check your backend connection.");
     });
 }

 const handleDelete = (id: number) => {
   if (window.confirm("Izbrisi uporabnika?")) {
     // Log the data being sent to the backend
     console.log("Sending data to backend:", {
       id_uporabnika: id,
     });
 
     axios
       .delete("http://localhost:8000/routes.php", {
         data: {
           id_uporabnika: id, 
         },
         headers: {
           "Content-Type": "application/json",
         },
         params: {
           action: "izbrisiUporabnika", 
         },
       })
       .then(() => {
         alert("Uporabnik uspesno izbrisan!");
         fetchUsers();
       })
       .catch((error) => {
         console.error("Error deleting user:", error);
         alert("Failed to delete user.");
       });
   }
 };
 

 useEffect(() => {
   fetchUsers();
 }, []);
 

 return (
   <div className="container">
     <h2>Seznam uporabnikov</h2>
     {error ? (
       <p style={{ color: "red" }}>{error}</p>
     ) : users.length === 0 ? (
       <p>No users found.</p>
     ) : (
       <ul>
         {users.map((user) => (
           <li key={user.id_uporabnika} className="container">
             <span>
               {user.ime} {user.priimek} ({user.mail})
             </span>
             <button
               onClick={() => handleDelete(user.id_uporabnika)}
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

export default PrikaziUporabnika;
