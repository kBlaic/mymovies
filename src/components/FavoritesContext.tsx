import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { Favorite } from '../types';

interface FavoritesContextType {
   favorites: Favorite[];
   addFavorite: (movie: Favorite) => void;
   removeFavorite: (movieId: number) => void;
   isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [favorites, setFavorites] = useState<Favorite[]>([]);

   useEffect(() => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
         setFavorites(JSON.parse(storedFavorites));
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
   }, [favorites]);

   const addFavorite = (movie: Favorite) => {
      setFavorites((previous) => [...previous, movie]);
   };

   const removeFavorite = (movieId: number) => {
      setFavorites((previous) => previous.filter((movie) => movie.id !== movieId));
   };

   const isFavorite = (movieId: number) => favorites.some((movie) => movie.id === movieId);

   return (
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
         {children}
      </FavoritesContext.Provider>
   );
};

export default FavoritesProvider;

export const useFavorites = (): FavoritesContextType => {
   const context = useContext(FavoritesContext);
   if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
   }
   return context;
};