// src/components/PokemonCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";

const PokemonCard = ({ pokemon, isFavorite, addFavorite, removeFavorite }) => {
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

          <div className="d-flex flex-row justify-content-center text-center mb-3 ">
            {pokemon.types?.map((type) => (
              <div key={type} className="  mx-2">
                <TypeBadge typeName={type} />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-around">
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
