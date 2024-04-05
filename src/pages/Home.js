// Home.js
import React from 'react';
import Products from './Products';
import Categories from './Categories'
import HeroSection from './HeroSection';

function Home() {
  return (
    <div>
    <HeroSection />
      <Categories />
      <Products />
    </div>
  );
}

export default Home;
