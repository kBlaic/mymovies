import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MovieDiscoveryScreen from './screens/MovieDiscoveryScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import TestScreen from './screens/TestScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/discover" element={<MovieDiscoveryScreen />} />
        <Route path='/movie/:id' element={<MovieDetailsScreen />} />
        <Route path='/test' element={<TestScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
