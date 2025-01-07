// src/components/PokemonCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, isFavorite, addFavorite, removeFavorite }) => {
  // console.log(pokemon.types[0]);
  return (
    <div className="col-md-4 mb-4" key={pokemon.id}>
      <div className="card card-img-top border border-2 border-danger rounded-top-5">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="rounded-top-5 bg-warning-subtle"
        />
        <div className="card-body">
          <h3 className="card-title text-capitalize text-center fw-bolder pb-3">
            {pokemon.name}
          </h3>
          <p className="card-title text-capitalize text-center">
            Type: {pokemon.types?.[0] || "Unknown"}
            {pokemon.types?.[1] && `, ${pokemon.types[1]}`}
          </p>

          <div className="d-flex  justify-content-around">
            <Link
              to={`/pokemon/${pokemon.name}`}
              className="btn btn-info btn-sm me-2"
            >
              <i className="bi bi-info-circle"></i> Details
            </Link>

            {isFavorite(pokemon.name) ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFavorite(pokemon.name)}
              >
                <i className="bi bi-heartbreak"></i>
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm"
                onClick={() => addFavorite(pokemon)}
              >
                <i className="bi bi-heart"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
