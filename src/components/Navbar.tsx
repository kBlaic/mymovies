import React, { useState, useEffect } from "react";
import { Movie, Favorite  } from "../types";
import { fetchSearchQuery } from "../api/api";
import { Input, List, Menu } from 'antd';
import './components.css'
import Dropdown from "./Dropdown";
import { useFavorites } from "./FavoritesContext";

const Navbar: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [searchResults, setSearchResults] = useState<Movie[]>([]);
   const { favorites } = useFavorites();

   useEffect(() => {
      const fetchData = async () => {
         if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
         }

         try {
            const movies = await fetchSearchQuery(searchQuery);
            setSearchResults(movies);
         } catch (error) {
            console.error('Error fetching search query movies: ', error);
         }
      };

      fetchData();
   }, [searchQuery]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };

   return (
      <div className="navbar">
         <h2>MyMovies</h2>
         <div className="navbarPartTwo">
            <div>
               <Input
                  style={{ width: '50vw'}}
                  type="text"
                  placeholder="Enter movie name"
                  value={searchQuery}
                  onChange={handleInputChange}
               />
               {searchResults.length !== 0 &&
               <List
                  dataSource={searchResults}
                  renderItem={(movie) => (
                     <List.Item key={movie.id}>{movie.title}</List.Item>
                  )}
                  />
               }
            </div>
               <Dropdown name="Favorites" items={favorites}/>
            </div>
      </div>
   );
};

export default Navbar;