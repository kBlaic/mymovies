import React from 'react';
import { Movie } from '../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import './components.css';
import MovieCard from './MovieCard';

interface HorizontalScrollListProps {
    title: string;
    movies: Movie[];
}

const HorizontalScrollMovies: React.FC<HorizontalScrollListProps> = ({ title, movies }) => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    return (
        <StyledHorizontalScrollList>
            <h2>{title}</h2>
            <Slider {...settings}>
                {movies.map((movie) => (
                   <MovieCard key={movie.id} movie={movie} />
                ))}
            </Slider>
        </StyledHorizontalScrollList>
    );
};

export default HorizontalScrollMovies;

const StyledHorizontalScrollList = styled.div`
    .slick-slider {
    }

    .slick-prev {
        zIndex: 1;
        cursor: 'pointer';
    } 
    
    .slick-next {
        zIndex: 1;
        cursor: 'pointer';
    }

`;