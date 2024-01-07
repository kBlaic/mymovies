import React, { useState, useEffect } from "react";
import { Filters, Genre } from "../../types";
import './Filter.css';
import { fetchGenres } from "../../api/api";
import { Button, Space, Slider, List } from 'antd';
import Dropdown from "../Dropdown/Dropdown";

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

   const handleSearch = () => {
      onSearch(filters);
   };

   const handleReset = () => {
      setFilters({});
      onReset();
   };

   const areFiltersEmpty = Object.keys(filters).length === 0;

   return (
      <div>
        <h2>Search movies by filters:</h2>
        <div className="button-group">
          <div className="filter-buttons">
            <Space>
              <Dropdown
                name="Year"
                component={
                  <div>
                    <label>Selected year: {filters.year}</label>
                    <Slider
                      min={1900}
                      max={2024}
                      step={1}
                      value={filters.year || 1900}
                      onChange={(value) => setFilters({ ...filters, year: value })}
                    />
                  </div>
                } 
              />
              <Dropdown
                name="Genres"
                component={
                  <div>
                    <label>Selected genre: {filters.genre?.name}</label>
                    <List
                      dataSource={genres}
                      renderItem={(genre) => (
                          <List.Item 
                            key={genre.id}
                            onClick={() => setFilters({ ...filters, genre: genre })}
                          >
                            {genre.name}
                          </List.Item>
                      )}
                    />
                  </div>
                }
              />
              <Dropdown
                name="Rating"
                component={
                  <div>
                    <label>Selected rating: {filters.rating}</label>
                    <Slider
                      min={1}
                      max={10}
                      step={0.1}
                      value={filters.rating || 1}
                      onChange={(value) => setFilters({ ...filters, rating: value })}
                    />  
                  </div>
                }
              />
            </Space>
          </div>
          <div className="action-buttons">
            <Space>
              <Button 
                className="action"
                onClick={handleSearch}
                disabled={areFiltersEmpty} 
              >
                Search by filters
              </Button>
              <Button 
                className="action"
                onClick={handleReset}
                disabled={areFiltersEmpty}  
              >
                Reset filters
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );

};

export default Filter;