// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetails from "./pages/PokemonDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
