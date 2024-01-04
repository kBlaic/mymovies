import React, { useState, useEffect } from "react";
import { Movie } from "../types";
import { fetchSearchQuery } from "../api/api";
import { Input, List } from 'antd';
import './Navbar.css'
import Dropdown from "./Dropdown";
import { useFavorites } from "./FavoritesContext";
import { Link } from 'react-router-dom';

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
         <h1>MyMovies</h1>
         <div className="navbar-main">
            <div className="navbar-favorites">
               <Dropdown name="Favorites" items={favorites}/>
            </div>
            <div style={{ position: 'relative' }}>
               <Input
                  style={{ width: '25vw'}}
                  type="text"
                  placeholder="Enter movie name"
                  value={searchQuery}
                  onChange={handleInputChange}
               />
               {searchResults.length !== 0 &&
               <div style={{ position: 'absolute', 
                              top: '101%', 
                              left: 5,
                              right: 5, 
                              zIndex: 1,
                              borderRadius: '5px',
                              background: "white" }}>
                  <List
                     bordered
                     dataSource={searchResults}
                     renderItem={(movie) => (
                        <Link to={`/movie/${movie.id}`}>
                           <List.Item key={movie.id}>{movie.title}</List.Item>
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