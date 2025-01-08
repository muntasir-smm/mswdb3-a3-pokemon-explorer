// src/pages/PokemonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import TypeBadge from "../components/TypeBadge";

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
    <div className=" container border border-2 border-info w-75 rounded-5 my-5 p-5 shadow-lg bg-light">
      <h1 className="m-2 p-3 bg-success text-center text-capitalize text-white rounded-3">
        {pokemon.name}
      </h1>
      <div className=" d-md-flex justify-content-evenly align-items-center">
        <div className="col-12 col-md-4 p-2 text-center">
          <div className="">
            {/* Pokémon Image */}
            <img
              src={
                pokemon.sprites.front_default ||
                "https://via.placeholder.com/150"
              }
              alt={pokemon.name}
              className="img-fluid mx-auto w-75 "
            />
          </div>

          {/* Favorites button */}
          <div className="text-center m-3">
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
          <h3 className="mt-4 text-uppercase">Abilities:</h3>
          <ul className="list-unstyled text-capitalize">
            {pokemon.abilities.map((ability, index) => (
              <li
                key={index}
                className="d-flex align-items-center justify-content-center mb-2"
              >
                <span className="me-2">
                  <i className="bi bi-check-circle-fill text-success"></i>
                </span>
                <span>{ability.ability.name}</span>
              </li>
            ))}
          </ul>

          {/* Pokémon Types */}
          <h3 className="mt-4 text-uppercase">Types:</h3>
          <div className="d-flex justify-content-center align-items-center">
            {pokemon.types.map((type, index) => (
              <div key={index} className="m-2">
                <TypeBadge typeName={type.type.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-md-8 p-2">
          {/* Pokémon Base Stats */}
          <h3 className="mt-4 text-uppercase">Base Stats:</h3>
          <ul className="list-unstyled">
            {pokemon.stats.map((stat, index) => {
              const barValue = stat.base_stat;
              const maxStatValue = 255; // Pokémon stat values typically range from 0 to 255
              const statValue = (barValue / maxStatValue) * 100;

              // Define unique colors for each stat
              const statColors = {
                hp: "#dc3545",
                attack: "#007bff",
                defense: "#28a745",
                "special-attack": "#ffc107",
                "special-defense": "#6f42c1",
                speed: "#17a2b8",
              };

              const barColor = statColors[stat.stat.name] || "#6c757d";

              return (
                <li key={index} className="mb-4">
                  <div className="d-flex justify-content-between text-capitalize mb-2">
                    <span className="fw-bold">{stat.stat.name}</span>
                    <span className="text-muted">{barValue}</span>
                  </div>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar position-relative"
                      role="progressbar"
                      style={{
                        width: `${statValue}%`,
                        backgroundColor: barColor,
                      }}
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
          <small>
            <em>
              *Percentage based on Pokémon stat values with a maximum of 255
            </em>
          </small>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
