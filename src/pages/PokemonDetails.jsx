// src/pages/PokemonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import TypeBadge from "../components/TypeBadge"; // Import the TypeBadge component

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Fetch Pokémon details on mount or when 'name' changes
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon details.");
      });
  }, [name]);

  // Loading state
  if (!pokemon && !error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-primary">Loading Pokémon details...</p>
        </div>
      </div>
    );

  if (error) return <p className="text-danger">{error}</p>;

  // Check if the current Pokémon is a favorite
  const isFavorite = favorites.some((fav) => fav.name === name);

  return (
    <div className="container border border-2 border-info w-50 rounded-5 mt-4 p-4">
      <h1 className="m-2 p-3 bg-info text-center text-capitalize">
        {pokemon.name}
      </h1>

      {/* Pokémon Image */}
      <img
        src={pokemon.sprites.front_default || "https://via.placeholder.com/150"}
        alt={pokemon.name}
        className="img-fluid border border-3 rounded-2 mx-auto d-block mb-3 w-50"
      />

      {/* Add/Remove from favorites button */}
      <div className="text-center mb-3">
        {isFavorite ? (
          <button
            className="btn btn-danger"
            onClick={() => removeFavorite(pokemon.name)}
            title="Remove from favorites"
          >
            <i className="bi bi-heartbreak"></i>
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() =>
              addFavorite({
                name: pokemon.name,
                url: `https://pokeapi.co/api/v2/pokemon/${name}`,
                image: pokemon.sprites.front_default,
                types: pokemon.types.map((type) => type.type.name),
              })
            }
            title="Add to favorites"
          >
            <i className="bi bi-heart"></i>
          </button>
        )}
      </div>

      {/* Pokémon Abilities */}
      <h3 className="mt-4">Abilities:</h3>
      <ul className="list-unstyled">
        {pokemon.abilities.map((ability, index) => (
          <li key={index} className="mb-2">
            {ability.ability.name}
          </li>
        ))}
      </ul>

      {/* Pokémon Types */}
      <h3 className="mt-4">Types:</h3>
      <div className="d-flex flex-wrap">
        {pokemon.types.map((type, index) => (
          <div key={index} className="m-2">
            <TypeBadge typeName={type.type.name} />
          </div>
        ))}
      </div>

      {/* Pokémon Base Stats */}
      <h3 className="mt-4">Base Stats:</h3>
      <ul className="list-unstyled">
        {pokemon.stats.map((stat, index) => {
          const barValue = stat.base_stat;
          const maxStatValue = 255; // Pokémon stat values typically range from 0 to 255
          const statValue = (barValue / maxStatValue) * 100;

          return (
            <li key={index} className="mb-3">
              <div className="d-flex justify-content-between text-capitalize mb-1">
                <span>{stat.stat.name}</span>
                <span>{barValue}</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar position-relative"
                  role="progressbar"
                  style={{ width: `${statValue}%` }}
                  aria-valuenow={statValue}
                  aria-valuemin="0"
                  aria-valuemax={maxStatValue}
                >
                  <span className="position-absolute w-100 text-center text-white">
                    {statValue.toFixed(0)}%
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p>*Percentage based on Pokémon stat values with a maximum of 255</p>
    </div>
  );
};

export default PokemonDetails;
