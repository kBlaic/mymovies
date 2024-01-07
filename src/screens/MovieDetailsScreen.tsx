import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import { Movie } from '../types'
import { fetchMovieDetails } from "../api/api";
import MovieCard from "../components/MovieCard/MovieCard";

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
      release_date,
      runtime,
      genres,
      cast,
      production_countries, 
   } = movieDetails;

   const formattedDate = release_date
      ? new Date(release_date).toLocaleDateString('en-GB', {
         day: 'numeric',
         month: 'numeric',
         year: 'numeric',
      })
      : '';

   return (
      <div className="details">
         <Navbar />
         <MovieCard movie={movieDetails}/>
         <h1>{title}</h1>
         <h3>Overview:</h3>
         <p>{overview}</p>
         <p><strong>Runtime:</strong> {runtime} min</p>
         <p><strong>Release Date:</strong> {formattedDate}</p>
         <div className="details-lists">
            <div>
               <strong>Cast:</strong>
               <ul>
                  {cast.map(actor => (
                     <li key={actor.id}>{actor.name}</li>
                  ))}
               </ul>
            </div>
            <div>
               <strong>Genres:</strong>
               <ul>
                  {genres.map(genre => (
                     <li key={genre.id}>{genre.name}</li>
                  ))}
               </ul>
               <strong>Production Countries:</strong>
               <ul>
                  {production_countries.map(country => (
                     <li key={country.iso_3166_1}>{country.name}</li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default MovieDetailsScreen;