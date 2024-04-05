import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer from './products/slices/productDetailsSlice';
import productsReducer from './products/slices/productsSlice';
import categorySliceReducer from './categories/slices/categorySlice'; 

const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    products: productsReducer,
    categories: categorySliceReducer, 

  },
});

export default store;
