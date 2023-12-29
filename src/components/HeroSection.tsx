import React from "react";
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
   return (
      <section className="hero">
         <div className="hero-content">
            <h1>Welcome to Movie Explorer</h1>
            <p>Discover and explore your favorite movies.</p>
            <Link to="/discover">
               <button>Discover Movies</button>
            </Link>
            <Link to="/test">
               <button>Test</button>
            </Link>
         </div>
      </section>
   )
};

export default HeroSection;