// Home.js
import React from 'react';
import Products from './Products';
import Categories from './Categories'
import HeroSection from './HeroSection';
import Feature from './Feature';
import TopProducts from './TopProducts';
import FloralStorySection from './FloralStorySection';

function Home() {
  return (
    <div>
    <HeroSection />
      <Categories />
      {/* <Products /> */}
      <TopProducts />
      <FloralStorySection />
      <Feature />


    </div>
  );
}

export default Home;
