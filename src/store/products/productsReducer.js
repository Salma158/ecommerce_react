import { combineReducers } from '@reduxjs/toolkit';
import productsSliceReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';

const productsReducer = combineReducers({
  products: productsSliceReducer,
  productDetails: productDetailsReducer,
});

export default productsReducer;
