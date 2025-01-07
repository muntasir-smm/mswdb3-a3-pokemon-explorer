// src/components/PokemonCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, isFavorite, addFavorite, removeFavorite }) => {
  return (
    <div className="col-md-4 mb-4" key={pokemon.id}>
      <div className="card">
        <img src={pokemon.image} alt={pokemon.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{pokemon.name}</h5>
          <Link
            to={`/pokemon/${pokemon.name}`}
            className="btn btn-primary btn-sm me-2"
          >
            View Details
          </Link>
          {isFavorite(pokemon.name) ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFavorite(pokemon.name)}
            >
              Remove Favorite
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => addFavorite(pokemon)}
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
