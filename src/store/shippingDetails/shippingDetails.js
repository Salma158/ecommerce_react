import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from "../../util/auth";

// Create async thunk for adding shipping address
export const addShippingAddress = createAsyncThunk(
  'shipping/addShippingAddress',
  async (formData, { rejectWithValue }) => {
    try {
       // console.log("inside slicer")
      const token = getAuthToken();
      const response = await axios.post('http://localhost:8000/address/', formData, {
        headers: {
          //'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("inside slicer")
      return response.data;
    } catch (error) {
        console.log("inside error")
      return rejectWithValue(error.response.data);
    }
  }
);

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    loading: false,
    addressInfo: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressInfo = action.payload;
        state.error = null;
      })
      .addCase(addShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default shippingSlice.reducer;
