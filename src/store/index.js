import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer from './products/slices/productDetailsSlice';
import productsReducer from './products/slices/productsSlice';
import categorySliceReducer from './categories/slices/categorySlice'; 
import categoryProductsSlice from './products/slices/categoryProductsSlice';
import categoryDetails from './categories/slices/categoryDetails';
import wishlistReducer from './wishlists/wishlists';

const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    products: productsReducer,
    categories: categorySliceReducer, 
    categoryProducts: categoryProductsSlice,
    categoryDetails: categoryDetails,
    wishlist: wishlistReducer,
  },
});

export default store;
