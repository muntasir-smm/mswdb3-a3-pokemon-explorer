// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=500")
      .then((res) => {
        setPokemonList(res.data.results);
      })

      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(pokemonList);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Pokémon</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredPokemon.map((pokemon) => (
          <div className="col-md-4 mb-4" key={pokemon.name}>
            <div className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                className="card-img-top rounded mx-auto d-block"
                alt={pokemon.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                } // Fallback image
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
