// src/components/PokemonCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, isFavorite, addFavorite, removeFavorite }) => {
  // console.log(pokemon.types[0]);
  return (
    <div className="col-md-4 mb-4" key={pokemon.id}>
      <div className="card">
        <img src={pokemon.image} alt={pokemon.name} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-capitalize text-center fw-bolder pb-3">
            {pokemon.name}
          </h3>
          <p className="card-title text-capitalize text-center">
            Type: {pokemon.types[0]}
            {pokemon.types[1] && `, ${pokemon.types[1]}`}
          </p>

          <div className="d-flex  justify-content-around">
            <Link
              to={`/pokemon/${pokemon.name}`}
              className="btn btn-primary btn-sm me-2"
            >
              Details
            </Link>
            {isFavorite(pokemon.name) ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFavorite(pokemon.name)}
              >
                Remove from Favorite
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
    </div>
  );
};

export default PokemonCard;
