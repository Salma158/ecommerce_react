import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchCategoryProducts = createAsyncThunk(
  'categoryProducts/fetchCategoryProducts',
  async (categoryId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories/${categoryId}/products`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoryProductsSlice.reducer;
