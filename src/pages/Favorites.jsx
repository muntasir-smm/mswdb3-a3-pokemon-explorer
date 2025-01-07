// src/pages/Favorites.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../components/SearchBar";
import SortAndFilter from "../components/SortAndFilter";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [typeFilter, setTypeFilter] = useState("");

  // Filter favorites based on the search input
  const filteredFavorites = favorites.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || pokemon.types.includes(typeFilter.toLowerCase()))
  );

  // Sort favorites based on the selected sort option
  const sortedFavorites = filteredFavorites.sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "stats") return b.stats - a.stats;
    return 0;
  });

  if (favorites.length === 0) {
    return <p className="text-center mt-5">No favorites added yet!</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center m-4">My Favorite Pokémon</h1>

      {/* Search and Sort/Filter */}
      <div className="mb-3">
        <SearchBar search={search} setSearch={setSearch} />
        <SortAndFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </div>

      {/* Display filtered and sorted favorites */}
      <div className="row">
        {sortedFavorites.map((pokemon) => (
          <div key={pokemon.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFavorite(pokemon.name)}
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
