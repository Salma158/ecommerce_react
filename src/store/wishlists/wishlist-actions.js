import { getAuthToken } from "./../../util/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchWishlist = createAsyncThunk("fetchWishlist", async (page = 1) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`http://localhost:8000/wishlists/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { wishlist: response.data };
  } catch (error) {
    return { error: error.message };
  }
});

export const deleteWishlistItem = createAsyncThunk(
  "deleteWishlistItem",
  async (id) => {
    try {
      const token = getAuthToken();
      await axios.delete(
        `http://localhost:8000/wishlists/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id };
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const addItemToWishlist = createAsyncThunk(
  "addItemToWishlist",
  async (product) => {
    try {
      const token = getAuthToken();
      const payload = { product : product._id }
      console.log(product._id)
      await axios.post(
        "http://localhost:8000/wishlists/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return product;
    } catch (error) {
      return { error: error.message };
    }
  }
);
