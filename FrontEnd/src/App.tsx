import React from "react";
import PrikaziUporabnika from "./components/Uporabnik/PrikaziUporabnika";
import UstvariUporabnika from "./components/Uporabnik/UstvariUporabnika";
import PrikaziKategorije from "./components/Kategorije/PrikaziKategorije";
import UstvariKategorije from "./components/Kategorije/UstvariKategorije";
import PrikaziOglas from "./components/Oglas/PrikaziOglas";
import UstvariOglas from "./components/Oglas/UstvariOglas";
import Login from "./components/Uporabnik/Login";
import "./App.css";
import LoggedInUser from "./components/Uporabnik/LoggedInUser";


const App = () => {
  return (
    <div>
      <h1>TEST</h1>
      <LoggedInUser />
      <UstvariUporabnika />
      <Login />
      <PrikaziUporabnika />
      <UstvariKategorije />
      <PrikaziKategorije />
      <UstvariOglas />
      <PrikaziOglas />
    </div>
  );
};

export default App;
