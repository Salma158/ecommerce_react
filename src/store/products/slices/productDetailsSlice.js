import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  loading: false,
  product: null,
  error: null
};

// Define thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
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

// Create productDetails slice
const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
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
      });
  },
});

// Export actions and reducer
export const productDetailsSelector = (state) => state.productDetails;
export default productDetailsSlice.reducer;
