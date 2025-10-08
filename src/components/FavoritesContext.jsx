import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Creo il contesto
const FavoritesContext = createContext();

// 2. Creo il provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carico i preferiti da localStorage all'avvio
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Aggiorno localStorage ogni volta che i preferiti cambiano
  useEffect(() => {
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
