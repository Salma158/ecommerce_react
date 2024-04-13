// Home.js
import React, { useEffect } from 'react';
import Products from './Products';
import Categories from './Categories'
import HeroSection from './HeroSection';
import Feature from './Feature';
import TopProducts from './TopProducts';
import FloralStorySection from './FloralStorySection';
import NewArrivals from './NewArrivals';
import { fetchWishlist } from '../store/wishlists/wishlist-actions';
import { useDispatch } from "react-redux";
import { setWishlist } from "./../store/wishlists/wishlist-slice"
import { useSelector } from "react-redux";
import { getAuthToken } from '../util/auth';
function Home() {

  const dispatch = useDispatch()
  const isFetched = useSelector((state) => state.wishlist.isFetched);

  useEffect(() => {
    const token = getAuthToken()
     if ( token) {
      dispatch(fetchWishlist())
     }
  }, []);



  return (
    <div>
    <HeroSection />
      <Categories />
      {/* <Products /> */}
      <TopProducts />
      {/* <NewArrivals /> */}
      <FloralStorySection />
      <Feature />


    </div>
  );
}

export default Home;
