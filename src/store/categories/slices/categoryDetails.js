
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categoryDetails: {},
  loading: false,
  error: null,
};

export const fetchCategoryDetails = createAsyncThunk(
  'categoryDetails/fetchCategoryDetails',
  async (categoryId) => {
    try {
      const response = await axios.get(`https://ecommerce-django-ittf.onrender.com/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const categoryDetailsSlice = createSlice({
  name: 'categoryDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDetails = action.payload;
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoryDetailsSlice.reducer;
