import React from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Button, Card, Image } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { useFavorites } from './FavoritesContext';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
   const { isFavorite, addFavorite, removeFavorite } = useFavorites();

   const toggleFavorite = () => {
      if (isFavorite(movie.id)) {
         removeFavorite(movie.id);
      } else {
         addFavorite(movie);
      }
   };

   return (
      <div className='movie-poster'>
         <Card className='card'>
            <Button onClick={toggleFavorite}>
               {isFavorite(movie.id) ? (
                  <BsBookmarkFill size={20} color='gold' />
               ) : (
                  <BsBookmark size={20} />
               )}
            </Button>
            <Link to={`/movie/${movie.id}`}>
               <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </Link>
         </Card>
      </div>
   );
};

export default MovieCard;