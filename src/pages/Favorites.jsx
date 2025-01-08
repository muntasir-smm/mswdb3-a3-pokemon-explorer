// src/pages/Favorites.jsx

import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../components/SearchBar";
import SortAndFilter from "../components/SortAndFilter";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

const Favorites = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination logic
  const totalItems = sortedFavorites.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedFavorites.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (favorites.length === 0) {
    return <p className="text-center mt-5">No favorites added yet!</p>;
  }

  return (
    <div className="container bg-danger-subtle">
      <h1 className="text-center fw-bolder display-3 mb-0 p-4">
        Favorite Pokémons
      </h1>

      <div className="d-md-flex  flex-row align-items-center  justify-content-between py-3">
        <div className="w-100">
          {/* Search Bar */}
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="w-100">
          {/* Sort and Filter */}
          <SortAndFilter
            sortOption={sortOption}
            setSortOption={setSortOption}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
        </div>
      </div>

      {/* Display filtered and sorted favorites using PokemonCard */}
      <div className="row py-5">
        {currentItems.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={() => true}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Favorites;
