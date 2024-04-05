import { combineReducers } from '@reduxjs/toolkit';
import productsSliceReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import categorySliceReducer from './categorySlice'; 
const rootReducer = combineReducers({
  products: productsSliceReducer,
  productDetails: productDetailsReducer,
  categories: categorySliceReducer, 

});

export default rootReducer;
