// src/pages/PokemonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch Pokémon details.");
      });
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  const isFavorite = favorites.some((fav) => fav.name === name);

  return (
    <div className="container border border-2 border-info w-50 rounded-5 mt-4 p-4">
      <h1 className="m-2 p-3 bg-info text-center text-capitalize">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default || "https://via.placeholder.com/150"}
        alt={pokemon.name}
        className="img-fluid border border-3 rounded-2 mx-auto d-block mb-3"
      />
      <div className="text-center mb-3">
        {isFavorite ? (
          <button
            className="btn btn-danger"
            onClick={() => removeFavorite(pokemon.name)}
          >
            Remove Favorite
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() =>
              addFavorite({
                name: pokemon.name,
                url: `https://pokeapi.co/api/v2/pokemon/${name}`,
              })
            }
          >
            Add to Favorites
          </button>
        )}
      </div>
      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h3>Types:</h3>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <h3>Base Stats:</h3>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
