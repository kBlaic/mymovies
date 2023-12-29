import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Movie } from '../types'
import { fetchMovieDetails } from "../api/api";

const MovieDetailsScreen: React.FC = () => {
   const { id } = useParams<{ id?: string }>();
   const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const details = await fetchMovieDetails(id ?? '');
            setMovieDetails(details);
         } catch (error) {
            console.error('Error fetching movie details: ', error);
         }
      };

      fetchData();
   }, [id]);

   if (!movieDetails) {
      return <div>Loading...</div>;
   }

   const { 
      title, 
      overview,
      popularity,
      poster_path,
      release_date,
      runtime,
      genres, 
   } = movieDetails;

   return (
      <div>
         <Navbar />
         <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}  />
         <h2>{title}</h2>
         <p>{overview}</p>
         <p>Popularity: {popularity}</p>
         <p>Release Date: {release_date}</p>
         <p>Runtime: {runtime} min</p>
         <div>
            <strong>Genres:</strong>
            <ul>
               {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default MovieDetailsScreen;