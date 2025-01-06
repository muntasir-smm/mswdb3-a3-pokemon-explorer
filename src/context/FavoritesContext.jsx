// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pokemon) => {
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFavorite = (pokemonName) => {
    setFavorites(favorites.filter((fav) => fav.name !== pokemonName));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
