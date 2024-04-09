/* eslint-disable no-unused-vars */
import { wishlistActions } from "./wishlist-slice";
import { getAuthToken } from "./../../util/auth";
const asycnWrapper = (promise) =>
  promise.then((data) => [undefined, data]).catch((error) => [error]);

export const fetchWishlistItems = (url) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const token = getAuthToken();

      const response = await fetch("http://localhost:8000/wishlists/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch Wishlist from DataBase");
      }

      const data = await response.json();
      console.log(data);
      return data;
    };
    const [error, data] = await asycnWrapper(fetchData());
    if (error) {
      return console.log(error.message);
    }

    dispatch(
      wishlistActions.getWishlist({
        items: data.length === 0 ? [] : data[0].product_details.results,
        isLoading: false,
        next: data.length === 0 ? null : data[0].product_details.next,
        previous: data.length === 0 ? null : data[0].product_details.previous,
      })
    );
  };
};


export const deleteWishlistItem = (id) => {
  return async (dispatch) => {
    // Dispatch action to set isLoading to true
    dispatch(wishlistActions.setLoading(true));

    const deleteFromWishlist = async (id) => {
      const token = getAuthToken();

      const response = await fetch(`http://localhost:8000/wishlists/${id}/`, {
        method: 'DELETE', // Specify the method as DELETE
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("hii")

      if (!response.ok) {
        throw new Error("Could not delete item from wishlist");
      }
    };

    try {
      await deleteFromWishlist(id);
      dispatch(wishlistActions.deleteFromWishlistR({ id }));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(wishlistActions.setLoading(false));
    }
  };
};


export const addItemToWishlist = (productId) => {
  return async (dispatch) => {
    const addToWishlist = async (product) => {
      const token = getAuthToken();
      const payload = { product: productId }; 
      const response = await fetch('http://localhost:8000/wishlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Could not Add item To Wishlist');
      }

      const data = await response.json();
      return data;
    };

    const [error, data] = await asycnWrapper(addToWishlist(productId));
    if (error) return console.log(error.message);
    dispatch(wishlistActions.addToWishlistR({
      id: data.id,
      product: productId,
    }));
  };
};
