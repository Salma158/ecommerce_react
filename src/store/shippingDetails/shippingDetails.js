import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
    name: 'shippingAddress',
    initialState: {},
    reducers: {
        addShippingAddress: (state, action) => {
            state.addressInfo = action.payload;

        }
    },

  });

  export const {addShippingAddress} = shippingSlice.actions
  export default shippingSlice.reducer;
