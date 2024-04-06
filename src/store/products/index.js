import { combineReducers } from '@reduxjs/toolkit';
import productsSliceReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import categorySliceReducer from './categorySlice'; 
import categoryProductsSlice from './slices/categoryProductsSlice';
const rootReducer = combineReducers({
  products: productsSliceReducer,
  productDetails: productDetailsReducer,
  categories: categorySliceReducer, 
  categoryProducts: categoryProductsSlice,


});

export default rootReducer;
