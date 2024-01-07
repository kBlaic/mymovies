import axios from "axios";
import { Movie, Genre, Cast } from '../types';

export const apiKey = '34bb6adb91f7fb75bcacc5d82652c904';
export const tmdbBaseUrl = 'https://api.themoviedb.org/3';

export const fetchMovies = async (listType: string) => {
   try {
      const response = await axios.get<{ results: Movie[] }>(`${tmdbBaseUrl}/movie/${listType}?api_key=${apiKey}`);
      return response.data.results;
   } catch (error) {
      console.error('Error fetching movies: ', error)
      return [];
   }
};

export const fetchMovieDetails = async (id: string): Promise<Movie | null> => {
   try {
      const response = await axios.get<Movie>(`${tmdbBaseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
      const details = response.data;

      const castResponse = await axios.get<{ cast: Cast[] }>(`${tmdbBaseUrl}/movie/${id}/credits?api_key=${apiKey}`);
      const castDetails = castResponse.data.cast;
      const limitedCast = castDetails.slice(0, 10);

      const movieDetails: Movie = {
         ...details,
         cast: limitedCast,
      };

      return movieDetails;
   } catch (error) {
      console.error('Error fetching movie details: ', error)
      return null;
   }
};

export const fetchGenres = async () => {
   try {
      const response = await axios.get<{ genres: Genre[] }>(`${tmdbBaseUrl}/genre/movie/list?api_key=${apiKey}`);
      return response.data.genres;
   } catch (error) {
      console.error('Error fetching genres: ', error)
      return [];
   }
};

export const fetchFilterQuery = async (query: string) => {
   try {
      const response = await axios.get<{ results: Movie[] }>(`${tmdbBaseUrl}/discover/movie?api_key=${apiKey}${query}`);
      return response.data.results;
   } catch (error) {
      console.error('Error fetching query results: ', error)
      return [];
   }
}

export const fetchSearchQuery = async (query: string) => {
   try {
      const response = await axios.get<{ results: Movie[] }>(`${tmdbBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
      return response.data.results;
   } catch (error) {
      console.error('Error fetching search query results: ', error)
      return [];
   }
}
