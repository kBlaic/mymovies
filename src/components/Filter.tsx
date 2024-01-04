import React, { useState, useEffect } from "react";
import { Filters, Genre } from "../types";
import './components.css';
import { fetchGenres } from "../api/api";
import { Button, Dropdown, Space, Slider } from 'antd';
import type { MenuProps } from 'antd'

interface FilterProps {
   onSearch: (filters: Filters) => void;
   onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onReset }) => {
   const [filters, setFilters] = useState<Filters>({});
   const [genres, setGenres] = useState<Genre[]>([]);

   const items: MenuProps['items'] = [
    {
      key: '1',
      label: 
        <div>
          <label>Select Year:</label>
          <Slider
            min={1900}
            max={2023}
            step={1}
            value={filters.year || 1900}
            onChange={(value) => setFilters({ ...filters, year: value })}
          />
        </div>
    },
  ];

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
            menu={{ items }}
            trigger={['click']}
          >
            <Button>Year</Button>
          </Dropdown>
          <Dropdown
            overlay={
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
            trigger={['click']}
          >
            <Button>Genres</Button>
          </Dropdown>
          <Dropdown
            overlay={
              <div className="p-3">
                <label>Select Rating:</label>
                <Slider
                  min={1}
                  max={10}
                  step={0.1}
                  value={filters.rating || 1}
                  onChange={(value) => setFilters({ ...filters, rating: value })}
                />
              </div>
            }
            trigger={['click']}
          >
            <Button>Rating</Button>
          </Dropdown>
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