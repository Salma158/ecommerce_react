import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from "../../util/auth";

export const fetchCart = createAsyncThunk(
  'cart/cartlist',
  async () => {
    const token = getAuthToken();
    const response = await axios.get('http://localhost:8000/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(response.data[0].product)
    console.log(response)
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: true,
    cart: [],
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = '';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(item => item.product._id !== action.payload);
        state.error = '';
      })
      .addMatcher(
        (action) => [fetchCart.pending, fetchCart.rejected, removeFromCart.pending, removeFromCart.rejected].includes(action.type),
        (state) => {
          state.loading = true;
        }
      );
  },
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId) => {
    const token = getAuthToken();
    await axios.delete(`http://localhost:8000/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

export default cartSlice.reducer;