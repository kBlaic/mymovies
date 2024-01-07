import React from "react";
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
   return (
      <div className="hero-content">
         <h1>Welcome to My Movies App,</h1>
         <h1>your guide for movies</h1>
         <p>Discover and explore new, popular and upcoming movies.</p>
         <Link to="/discover">
            <button className="hero-button">Discover Movies</button>
         </Link>
      </div>
   );
};

export default HeroSection;