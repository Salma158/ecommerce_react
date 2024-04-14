import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from "../../util/auth";

export const fetchCart = createAsyncThunk(
  'cart/cartlist',
  async () => {
    const token = getAuthToken();
    const response = await axios.get('http://localhost:8000/cart/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: true,
    cart: [],
    totalQuantity: 0, // Add a new state to hold the total quantity
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.error = '';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = '';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(item => item._id !== action.payload);
        state.error = '';
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, actionType } = action.payload;
      
        const cartItems = state.cart || [];
      
        if (Array.isArray(cartItems)) {
          let updatedCart = cartItems.map(item => {
            if (item._id === productId) {
              if (actionType === 'Increase') {
                return { ...item, quantity: item.quantity + 1 };
              } else if (actionType === 'Decrease') {
                return { ...item, quantity: item.quantity - 1 };
              }
            }
            return item;
          });
      
          updatedCart = updatedCart.filter(item => item.quantity > 0);
      
          state.cart = updatedCart;
          state.error = '';
        }
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
    await axios.delete(`http://localhost:8000/cart/${productId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, actionType }) => {
    const token = getAuthToken();
    await axios.patch(`http://localhost:8000/cart/${productId}/update`, { action: actionType }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { productId, actionType };
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId) => {
    const token = getAuthToken();
    await axios.post('http://localhost:8000/cart/', { product: productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId; // Return the productId added to the cart
  }
);

export default cartSlice.reducer;
