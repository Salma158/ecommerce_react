import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from "../../util/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const fetchUserOrders = createAsyncThunk(
  'order/userOrders',
  async () => {
    const token = getAuthToken();
    const response = await axios.get('http://localhost:8000/orders/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId) => {
    const token = getAuthToken();
    const response = await axios.get(`http://localhost:8000/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (orderId) => {
      const token = getAuthToken();
      await axios.patch(`http://localhost:8000/orders/${orderId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("in action", orderId)
      return orderId;
    }
  );



export const checkout = createAsyncThunk(
    'order/checkout',
    async (_, { rejectWithValue }) => {
        try {
            const token = getAuthToken();
            const response = await fetch(
                "http://localhost:8000/orders/checkout-session",
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            }
            const data = await response.json();
            console.log(response.data)
            return window.location.href = data.checkout_url;
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            return rejectWithValue(error.message);
        }
    }
);



export const removeOrder = createAsyncThunk(
  'order/removeOrder',
  async (orderId) => {
    const token = getAuthToken();
    await axios.delete(`http://localhost:8000/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return orderId;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: true,
    orders: [],
    order : [],
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      // state.order = action.payload.order_items;
      state.order = action.payload;
      // console.log(state.order)
      state.error = '';
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = '';
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addMatcher(
        (action) => [fetchUserOrders.pending, fetchUserOrders.rejected, removeOrder.pending, removeOrder.rejected].includes(action.type),
        (state) => {
          state.loading = true;
        }
      );
  },
});

export default orderSlice.reducer;
