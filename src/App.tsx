import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MovieDiscoveryScreen from './screens/MovieDiscoveryScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import FavoritesProvider from './FavoritesContext';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/discover" element={<MovieDiscoveryScreen />} />
          <Route path='/movie/:id' element={<MovieDetailsScreen />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
