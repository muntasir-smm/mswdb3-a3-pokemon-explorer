// src/utils/api.js

import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 50) => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
  return response.data.results;
};

export const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
