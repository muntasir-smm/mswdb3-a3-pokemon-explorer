// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // Import the Favorites Context

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name"); // Sorting option
  const [typeFilter, setTypeFilter] = useState(""); // Type filter, initially set to an empty string
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Destructure favorites methods

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50") // Set a reasonable limit
      .then((res) => {
        setPokemonList(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  const filteredPokemon = pokemonList.filter(
    (pokemon) =>
      pokemon.name && pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPokemon = () => {
    let sorted = [...filteredPokemon];
    if (sortOption === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "stats") {
      // Assuming `base_stats` is an array with the base stats values
      sorted.sort((a, b) => a.stats - b.stats);
    }
    return sorted;
  };

  const filteredAndSortedPokemon = () => {
    let result = sortedPokemon();
    if (typeFilter && result.length > 0) {
      result = result.filter((pokemon) =>
        pokemon.types
          ? pokemon.types.some((type) => type.type.name === typeFilter)
          : false
      );
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return result.slice(startIndex, endIndex);
  };

  const isFavorite = (name) => favorites.some((fav) => fav.name === name);

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

      <div className="mb-3 d-flex gap-3">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h5>Sort by: </h5>
          <select
            className="form-select w-auto d-inline-block"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="name">Name</option>
            <option value="stats">Base Stats</option>
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <h5>Filter by:</h5>
          <select
            className="form-select w-auto d-inline-block"
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
          >
            <option value="">All</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
            <option value="Psychic">Psychic</option>
            <option value="Rock">Rock</option>
            <option value="Bug">Bug</option>
            <option value="Ghost">Ghost</option>
            {/* Add more Pokémon types as needed */}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredAndSortedPokemon().map((pokemon) => (
          <div className="col-md-4 mb-4" key={pokemon.name}>
            <div className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url ? pokemon.url.split("/")[6] : ""
                }.png`}
                className="card-img-top rounded mx-auto d-block"
                alt={pokemon.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                } // Fallback image
              />
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
        ))}
      </div>

      <div className="pagination-container mt-4">
        {pokemonList.length > itemsPerPage && (
          <nav>
            <ul className="pagination">
              {[
                ...Array(Math.ceil(pokemonList.length / itemsPerPage)).keys(),
              ].map((page) => (
                <li
                  key={page + 1}
                  className={`page-item ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default HomePage;
