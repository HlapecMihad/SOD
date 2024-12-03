import UstvariUporabnika from "./components/Uporabnik/UstvariUporabnika";
import UstvariKategorije from "./components/Kategorije/UstvariKategorije";
import OglasLayout from "./pages/Oglas/OglasLayout";
import UstvariOglas from "./components/Oglas/UstvariOglas";
import Login from "./components/Uporabnik/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/ErrorPage/NoPage";
import Layout from "./pages/Layout/Layout";
import KategorijeLayout from "./pages/Kategorije/KategorijeLayout";
import PrikaziUporabnika from "./components/Uporabnik/PrikaziUporabnika";
import "./App.css";

const App = () => {
  return (
   <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
         <Route index element={<OglasLayout />} />
         <Route path="kategorije" element={<KategorijeLayout />} />
         <Route path="login" element={<Login />} />
         <Route path="register" element={<UstvariUporabnika />} />
         <Route path="uporabniki" element={<PrikaziUporabnika />} />
         {/*
         <Route path="ustvariOglas" element={<UstvariOglas />} />
         <Route path="ustvariKategorijo" element={<UstvariKategorije />} />
         */}
         <Route path="*" element={<NoPage />} />
      </Route>
      </Routes>
   </BrowserRouter>
  );
};

export default App;
