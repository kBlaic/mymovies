import React, { useState, useEffect } from "react";
import { Filters, Genre } from "../types";
import './components.css';
import { fetchGenres } from "../api/api";
import { Button, Space, Slider } from 'antd';
import Dropdown from "./Dropdown";

interface FilterProps {
   onSearch: (filters: Filters) => void;
   onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onReset }) => {
   const [filters, setFilters] = useState<Filters>({});
   const [genres, setGenres] = useState<Genre[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const genresFetch = await fetchGenres();
            setGenres(genresFetch);
         } catch (error) {
            console.error(`Error fetching genres: `, error);
         }
      };
      
      fetchData();
   }, []);

   const handleFilterChange = () => {
      onSearch(filters);
   };

   const handleReset = () => {
      setFilters({});
      onReset();
   };

   return (
      <div className="filter">
        <h2>Filters:</h2>
        <Space>
          <Dropdown
            name="Year"
            component={
              <Slider
                min={1900}
                max={2023}
                step={1}
                value={filters.year || 1900}
                onChange={(value) => setFilters({ ...filters, year: value })}
              />
            } 
          />
          <Dropdown
            name="Genres"
            component={
              <div>
                {genres.map(genre => (
                  <Button
                    key={genre.id}
                    onClick={() => setFilters({ ...filters, genre: genre.name })}
                    style={{ margin: '5px' }}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
            }
          />
          <Dropdown
            name="Rating"
            component={
              <Slider
                min={1}
                max={10}
                step={0.1}
                value={filters.rating || 1}
                onChange={(value) => setFilters({ ...filters, rating: value })}
              />
            }
          />
          <Button onClick={handleFilterChange}>
            Search
          </Button>
          <Button onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </div>
    );

};

export default Filter;