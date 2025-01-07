// src/pages/Favorites.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center mt-5">No favorites added yet!</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Favorite Pokémon</h1>
      <div className="row">
        {favorites.map((pokemon) => (
          <div key={pokemon.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFavorite(pokemon.name)}
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
