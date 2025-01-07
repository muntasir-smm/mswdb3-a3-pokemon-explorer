// src/pages/Favorites.jsx

import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../components/SearchBar";
import SortAndFilter from "../components/SortAndFilter";
import PokemonCard from "../components/PokemonCard";

const Favorites = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

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
      <h1 className="text-center m-4 pt-5">My Favorite Pokémon</h1>

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

      {/* Display filtered and sorted favorites using PokemonCard */}
      <div className="row">
        {sortedFavorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={() => true} // Always true coz it's the favorite page
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
