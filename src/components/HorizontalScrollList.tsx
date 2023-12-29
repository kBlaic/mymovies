import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './components.css';
import { Button, Card, Image } from 'antd';

interface HorizontalScrollListProps {
    title: string;
    movies: Movie[];
}

const HorizontalScrollList: React.FC<HorizontalScrollListProps> = ({ title, movies }) => {
    const [favorites, setFavorites] = useState<{ id:string; title: string }[]>([]);

    const toggleFavorite = (movieId: string, movieTitle: string) => {
        if (isFavorite(movieId)) {
            const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
            setFavorites(updatedFavorites);
        } else {
            const updatedFavorites = [...favorites, { id: movieId, title: movieTitle }];
            setFavorites(updatedFavorites);
        }
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (movieId: string) => favorites.some((fav) => fav.id === movieId);
    
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
                   <div key={movie.id} className='movie-poster'>
                        <Card>
                            <Button
                                onClick={() => toggleFavorite(movie.id.toString(), movie.title)}
                            >
                                {isFavorite(movie.id.toString()) ? (
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
                ))}
            </Slider>
        </StyledHorizontalScrollList>
    );
};

export default HorizontalScrollList;

const StyledHorizontalScrollList = styled.div`
    margin-bottom: 20px;

    h2 {
    }

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

    .movie-poster {
        margin-right: 10px;

        img {
            width: 150px;
            height: 225px;
            object-fit: cover;
        }
    }
`;