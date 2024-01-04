import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import HorizontalScrollMovies from "../components/HorizontalScrollMovies";
import { Movie, Filters, Genre } from "../types";
import Filter from "../components/Filter";
import { fetchGenres, fetchMovies, tmdbBaseUrl, apiKey, fetchQuery } from "../api/api";
import MovieCard from "../components/MovieCard";

interface PopularMoviesByGenre {
   [key: string]: Movie[];
}

const MovieDiscoveryScreen: React.FC = () => {
   const [genres, setGenres] = useState<Genre[]>([]);
   const [newestMovies, setNewestMovies] = useState<Movie[]>([]);
   const [popularMoviesByGenre, setPopularMoviesByGenre] = useState<PopularMoviesByGenre>({});
   const [filterMovies, setFilterMovies] = useState<Movie[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [genresFetch, moviesNew] = await Promise.all([
               fetchGenres(),
               fetchMovies('now_playing'),
            ]);

            setGenres(genresFetch);
            setNewestMovies(moviesNew);

            genres.forEach(genre => {
               axios.get<{ results: Movie[] }>(`${tmdbBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genre.id}&sort_by=popularity.desc`)
                 .then(response => setPopularMoviesByGenre(prevState => ({
                   ...prevState,
                   [genre.name]: response.data.results
                 })))
                 .catch(error => console.error(`Error fetching popular movies in ${genre.name}:`, error));
             });
         } catch (error) {
            console.error(`Error fetching movies: `, error);
         }
      };
      
      fetchData();
   }, [genres]);

   const handleSearch = async (filters: Filters) => {
      const { year, genre, rating } = filters;

      const queryParams: string[] = [];
      if (year) queryParams.push(`primary_release_year=${year}`);
      if (genre) queryParams.push(`with_genres=${genre}`);
      if (rating) queryParams.push(`vote_average.gte=${rating}`);

      const queryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';
      try {
         const movies = await fetchQuery(queryString);
         setFilterMovies(movies);
      } catch (error) {
         console.error(`Error fetching movies from query: `, error);
      }
   };

   const onSearch = (filters: Filters) => {
      handleSearch(filters);
   };

   const handleResetFilters = () => {
      setFilterMovies([]);
   };

   return (
      <div>
         <Navbar />
         <h1>Discover Movies</h1>
         <Filter onSearch={onSearch} onReset={handleResetFilters}/>
         {filterMovies.length > 0 &&
            <div>
               {filterMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
               ))}
            </div>
         }
         <HorizontalScrollMovies title="Newest Movies" movies={newestMovies} />
         {genres.map(genre => (
            <HorizontalScrollMovies key={genre.id} title={`Popular ${genre.name} Movies`} movies={popularMoviesByGenre[genre.name] || []} />
         ))}
      </div>
   );
};

export default MovieDiscoveryScreen;