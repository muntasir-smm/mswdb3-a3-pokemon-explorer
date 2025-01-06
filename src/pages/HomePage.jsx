// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import { fetchPokemonList } from "../utils/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetchPokemonList().then((data) => {
      setPokemonList(data);
      setFilteredPokemon(data);
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
