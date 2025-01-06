// src/components/PokemonCard.js

import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const getIdFromUrl = (url) => url.split("/").filter(Boolean).pop();

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(
          pokemon.url
        )}.png`}
        alt={pokemon.name}
      />
      <Link to={`/pokemon/${pokemon.name}`}>View Details</Link>
    </div>
  );
};

export default PokemonCard;
