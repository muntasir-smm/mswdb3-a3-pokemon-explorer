// src/pages/FavoritesPage.js

import React from "react";
import { getFavorites } from "../utils/localStorage";

const FavoritesPage = () => {
  const favorites = getFavorites();

  if (favorites.length === 0) return <p>No favorites yet!</p>;

  return (
    <div>
      {favorites.map((pokemon) => (
        <div key={pokemon.name}>
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
