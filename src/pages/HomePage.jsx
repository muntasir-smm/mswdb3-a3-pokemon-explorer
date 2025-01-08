// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../components/SearchBar";
import SortAndFilter from "../components/SortAndFilter";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50") // Fetch 50 Pokémon
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
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      });
  }, []);

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
    <div className="container bg-info-subtle">
      <h1 className="text-center fw-bolder display-3 mb-0 p-4">Pokémon</h1>
      <div className="d-md-flex flex-row align-items-center justify-content-between py-3">
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

      <div className="py-5">
        {/* Loading Spinner */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <div
                className="spinner-border text-primary mb-3"
                role="status"
              ></div>
              <p className="text-primary">Loading Pokémon...</p>
            </div>
          </div>
        ) : paginatedPokemon.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-4">
            {/* Pokémon Card List */}
            {paginatedPokemon.map((pokemon) => (
              <div key={pokemon.id} className="mb-4 ">
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFavorite}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <h4>
              {typeFilter
                ? `There is no Pokémon of type "${typeFilter}".`
                : "No Pokémon found matching your search criteria."}
            </h4>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && paginatedPokemon.length > 0 && (
        <Pagination
          totalItems={filteredPokemon.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HomePage;
