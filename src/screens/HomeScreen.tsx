import React, { useState, useEffect } from "react";
import { Movie } from '../types';
import { fetchMovies } from "../api/api";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import HorizontalScrollList from "../components/HorizontalScrollMovies";

const HomeScreen: React.FC = () => {
   const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
   const [popular, setPopular] = useState<Movie[]>([]);
   const [topRated, setTopRated] = useState<Movie[]>([]);
   const [upcoming, setUpcoming] = useState<Movie[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [moviesNow, moviesPopular, moviesTop, moviesUpcoming] = await Promise.all([
               fetchMovies('now_playing'),
               fetchMovies('popular'),
               fetchMovies('top_rated'),
               fetchMovies('upcoming'),
            ]);

            setNowPlaying(moviesNow);
            setPopular(moviesPopular);
            setTopRated(moviesTop);
            setUpcoming(moviesUpcoming);
         } catch (error) {
            console.error('Error fetching movies: ', error);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         <Navbar />
         <HeroSection />
         <h2>Search for new, popular and upcoming movies</h2>
         <HorizontalScrollList title="Now Playing Movies" movies={nowPlaying} />
         <HorizontalScrollList title="Popular Movies" movies={popular} />
         <HorizontalScrollList title="Top Rated Movies" movies={topRated} />
         <HorizontalScrollList title="Upcoming Movies" movies={upcoming} />
      </div>
   );
};

export default HomeScreen;