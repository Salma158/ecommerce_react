import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from "../../util/auth";

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const token = getAuthToken();
    const response = await axios.get('http://localhost:8000/wishlists/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data[0].product_details.results)
    return response.data[0].product_details.results;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    loading: false,
    wishlist: [],
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = '';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload);
        state.error = '';
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter(id => id !== action.payload);
        state.error = '';
      })
      .addMatcher(
        (action) => [fetchWishlist.pending, fetchWishlist.rejected, addToWishlist.pending, addToWishlist.rejected, removeFromWishlist.pending, removeFromWishlist.rejected].includes(action.type),
        (state) => {
          state.loading = true;
        }
      );
  },
});

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId) => {
    const token = getAuthToken();
    const payload = { product: productId };
    await axios.post('http://localhost:8000/wishlists/', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId) => {
    const token = getAuthToken();
    await axios.delete(`http://localhost:8000/wishlists/${productId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

export default wishlistSlice.reducer;
