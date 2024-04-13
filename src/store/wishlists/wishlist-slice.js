import {
  fetchWishlist,
  deleteWishlistItem,
  addItemToWishlist,
} from "./wishlist-actions";
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    error: null,
    loading: false,
    next: null,
    previous: null,
    isFetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.wishlist[0]?.product_details.results || [];
        state.next = action.payload.wishlist[0]?.product_details.next;
        state.previous = action.payload.wishlist[0]?.product_details.previous;
        state.loading = false;
        state.isFetched = true;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(deleteWishlistItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
