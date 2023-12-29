import React, { useState, useEffect } from "react";
import { Movie, Favorite  } from "../types";
import { fetchSearchQuery } from "../api/api";
import { Input, List, Dropdown, Menu } from 'antd';
import './components.css'

const Navbar: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [searchResults, setSearchResults] = useState<Movie[]>([]);
   const [favorites, setFavorites] = useState<Favorite[]>([]);

   useEffect(() => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
         setFavorites(JSON.parse(storedFavorites));
      }

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
   }

   const menu = (
      <Menu>
         {favorites.map((favorite, index) => (
            <Menu.Item key={index}>
               {favorite.title}
            </Menu.Item>
         ))}
      </Menu>
   );

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
               <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                     Favorites
                  </a>
               </Dropdown>
            </div>
      </div>
   );
};

export default Navbar;