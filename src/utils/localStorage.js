// src/utils/localStorage.js

export const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];
export const addFavorite = (pokemon) => {
  const favorites = getFavorites();
  localStorage.setItem("favorites", JSON.stringify([...favorites, pokemon]));
};
export const removeFavorite = (name) => {
  const favorites = getFavorites().filter((p) => p.name !== name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
