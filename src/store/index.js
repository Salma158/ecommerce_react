import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer from './products/slices/productDetailsSlice';
import productsReducer from './products/slices/productsSlice';
import categorySliceReducer from './categories/slices/categorySlice'; 
import categoryProductsSlice from './products/slices/categoryProductsSlice';
import categoryDetails from './categories/slices/categoryDetails';
import cartSlice from './cart/cart'
import shippingSlice from './shippingDetails/shippingDetails'
import wishlistSlice from './wishlists/wishlist-slice';
import orderSlice from './order/order';

const store = configureStore({
  reducer: {
    productDetails: productDetailsReducer,
    products: productsReducer,
    categories: categorySliceReducer, 
    categoryProducts: categoryProductsSlice,
    categoryDetails: categoryDetails,
    cart: cartSlice,
    shippingAddress: shippingSlice,
    wishlist: wishlistSlice,
    order: orderSlice
  },
});

export default store;
