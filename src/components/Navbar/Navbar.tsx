import React, { useState, useEffect } from "react";
import { Movie } from "../../types";
import { fetchSearchQuery } from "../../api/api";
import { Input, List } from 'antd';
import './Navbar.css'
import Dropdown from "../Dropdown/Dropdown";
import { useFavorites } from "../../FavoritesContext";
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const Navbar: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [searchResults, setSearchResults] = useState<Movie[]>([]);
   const [visible, setVisible] = useState<boolean>(false);
   const { favorites } = useFavorites();

   const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

   useEffect(() => {
      const fetchData = async () => {
         if (debouncedSearchQuery.trim() === '') {
            emptySearchBar();
            return;
         }

         try {
            const movies = await fetchSearchQuery(debouncedSearchQuery);
            setSearchResults(movies);
            setVisible(true);
         } catch (error) {
            console.error('Error fetching search query movies: ', error);
         }
      };

      fetchData();
   }, [debouncedSearchQuery]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };

   const emptySearchBar = () => {
      setSearchQuery('');
      setSearchResults([]);
   }

   return (
      <div className="navbar">
         <h1>MyMovies</h1>
         <div className="navbar-main">
            <div className="navbar-favorites">
               <Dropdown 
                  name="Favorites" 
                  component={
                     <List
                        dataSource={favorites}
                        renderItem={(favorite) => (
                           <Link to={`/movie/${favorite.id}`}>
                              <List.Item key={favorite.id}>{favorite.title}</List.Item>
                           </Link>
                        )}
                     />
                  }
               />
            </div>
            <div className="navbar-searchBar">
               <Input
                  className="navbar-input"
                  type="text"
                  placeholder="Enter movie name"
                  value={searchQuery}
                  onChange={handleInputChange}
               />
               {visible && searchResults.length !== 0 &&
                  <div className="search-results">
                     <List
                        bordered
                        dataSource={searchResults}
                        renderItem={(movie) => (
                           <Link to={`/movie/${movie.id}`}>
                              <List.Item key={movie.id} onClick={emptySearchBar}>
                                 {movie.title}
                              </List.Item>
                           </Link>
                        )}
                     />
                  </div>
               }
            </div>
         </div>
      </div>
   );
};

export default Navbar;