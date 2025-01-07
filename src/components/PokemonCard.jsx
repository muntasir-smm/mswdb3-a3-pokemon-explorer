// src/components/PokemonCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, isFavorite, addFavorite, removeFavorite }) => {
  // console.log(pokemon.types[0]);
  const getTypeBadgeClass = (typeName) => {
    switch (typeName) {
      case "normal":
        return "bg-secondary";
      case "fire":
        return "bg-danger";
      case "water":
        return "bg-primary";
      case "grass":
        return "bg-success-subtle";
      case "electric":
        return "bg-warning";
      case "ice":
        return "bg-info-subtle";
      case "fighting":
        return "bg-danger-subtle";
      case "poison":
        return "bg-secondary";
      case "ground":
        return "bg-warning-subtle";
      case "flying":
        return "bg-info";
      case "psychic":
        return "bg-danger";
      case "bug":
        return "bg-dark";
      case "rock":
        return "bg-secondary";
      case "ghost":
        return "bg-dark-subtle";
      case "dragon":
        return "bg-primary";
      case "dark":
        return "bg-dark";
      case "steel":
        return "bg-secondary-subtle";
      case "fairy":
        return "bg-warning-subtle";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="col-md-4 mb-4" key={pokemon.id}>
      <div className="card card-img-top border border-2 border-danger rounded-top-5">
        <img
          src={pokemon.image || "https://via.placeholder.com/150"}
          alt={pokemon.name || "Unknown Pokémon"}
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
                title="Remove from Favorites"
              >
                <i className="bi bi-heartbreak"></i>
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm"
                onClick={() => addFavorite(pokemon)}
                title="Add to Favorites"
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
