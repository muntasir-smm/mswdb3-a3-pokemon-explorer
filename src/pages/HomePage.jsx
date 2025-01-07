// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../components/SearchBar";
import SortAndFilter from "../components/SortAndFilter";
import PokemonCard from "../components/PokemonCard";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50") // Fetch first 50 Pokémon
      .then((res) => {
        const fetchDetails = res.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((details) => ({
            name: details.data.name,
            id: details.data.id,
            image: details.data.sprites.front_default,
            types: details.data.types.map((t) => t.type.name),
            stats: details.data.stats.reduce(
              (total, stat) => total + stat.base_stat,
              0
            ),
          }))
        );

        Promise.all(fetchDetails).then((detailedList) => {
          setPokemonList(detailedList);
        });
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, []);

  // console.log(pokemonList);

  const filteredPokemon = pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || pokemon.types.includes(typeFilter.toLowerCase()))
  );

  const sortedPokemon = filteredPokemon.sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "stats") return b.stats - a.stats;
    return 0;
  });

  const paginatedPokemon = sortedPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isFavorite = (name) => favorites.some((fav) => fav.name === name);

  return (
    <div className="container bg-info-subtle ">
      <h1 className="py-3 py-lg-5 text-center fw-bolder display-3">Pokémon</h1>

      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Sort and Filter */}
      <SortAndFilter
        sortOption={sortOption}
        setSortOption={setSortOption}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Pokémon List */}
      {paginatedPokemon.length > 0 ? (
        <div className="row">
          {paginatedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <h4>
            {typeFilter
              ? `There is no Pokémon of type "${typeFilter}".`
              : "No Pokémon found."}
          </h4>
        </div>
      )}

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center m-0 p-2">
          {[
            ...Array(Math.ceil(filteredPokemon.length / itemsPerPage)).keys(),
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
    </div>
  );
};

export default HomePage;
