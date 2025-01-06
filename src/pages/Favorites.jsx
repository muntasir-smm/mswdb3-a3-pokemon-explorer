// src/pages/Favorites.jsx
import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center mt-5">No favorites added yet!</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Favorites</h1>
      <ul className="list-group">
        {favorites.map((pokemon) => (
          <li
            key={pokemon.name}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{pokemon.name}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFavorite(pokemon.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
