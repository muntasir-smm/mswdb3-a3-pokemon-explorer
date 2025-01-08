// src/context/FavoritesContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Retrieve favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites) && parsedFavorites.length > 0) {
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      // Only store favorites if they exist
      if (favorites.length > 0) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (pokemon) => {
    // Avoid duplicates
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
    }
  };

  const removeFavorite = (pokemonName) => {
    // Filter out the removed pokemon
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name !== pokemonName)
    );
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
