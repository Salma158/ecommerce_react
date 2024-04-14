
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://ecommerce-django-ittf.onrender.com/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postProductReview = createAsyncThunk(
  'productDetails/postProductReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authorization token not found');
      }
      

      const response = await fetch(`https://ecommerce-django-ittf.onrender.com/api/products/${productId}/reviews/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to post product review');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  'productDetails/fetchProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://ecommerce-django-ittf.onrender.com/api/products/${productId}/reviews/`);
      if (!response.ok) {
        throw new Error('Failed to fetch product reviews');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    loading: false,
    product: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload); 
      })
      .addCase(postProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const productDetailsSelector = (state) => state.productDetails;
export const productSelector = (state) => state.productDetails.product;
export const reviewsSelector = (state) => state.productDetails.reviews;

export default productDetailsSlice.reducer;
