import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setCurrentPage, setTotalPages } = productsSlice.actions;

export const fetchProducts = (page = 1) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get(`https://ecommerce-django-ittf.onrender.com/api/products?page=${page}`);
    dispatch(fetchProductsSuccess(response.data.results));
    dispatch(setTotalPages(response.data.total_pages));
    dispatch(setCurrentPage(page));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchTopProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get('https://ecommerce-django-ittf.onrender.com/api/products/top/');
    dispatch(fetchProductsSuccess(response.data)); 
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchNewArrivals = () => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get('https://ecommerce-django-ittf.onrender.com/api/products?page=1');
      dispatch(fetchProductsSuccess(response.data.results)); 
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

  export const searchProducts = (query) => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get(`https://ecommerce-django-ittf.onrender.com/api/products/search/${query}`);
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };



  export const fetchSortedProducts = () => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get('https://ecommerce-django-ittf.onrender.com/api/products/sorted-by-price/');
      dispatch(fetchProductsSuccess(response.data.results)); 
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
export default productsSlice.reducer;
