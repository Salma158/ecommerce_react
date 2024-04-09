import styles from "./Wishlists.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import LoadingSpinner from "./../components/LoadingSpinner";
import { fetchWishlistItems } from "../store/wishlists/wishlist-actions";
import { deleteWishlistItem } from "../store/wishlists/wishlist-actions";
import { wishlistActions } from "../store/wishlists/wishlist-slice";

const MyWishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLoading = useSelector((state) => state.wishlist.isLoading);
  const next = useSelector((state) => state.wishlist.next);
  const previous = useSelector((state) => state.wishlist.previous);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(fetchWishlistItems(next));
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(fetchWishlistItems(previous));
  };

  const handleDeleteItem = (product) => {
    try {
      const updatedWishlistItems = wishlistItems.filter(
        (item) => item._id !== product._id
      );
      dispatch(
        wishlistActions.getWishlist({
          items: updatedWishlistItems,
          isLoading: true,
        })
      );
      dispatch(deleteWishlistItem(product._id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isChecked, setIsChecked] = useState({});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Wishlist</h2>
          </div>
          {wishlistItems.length > 0 ? (
            <>
              <table className={styles["wishlist-table"]}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Product name</th>
                    <th>Unit price</th>
                    <th>Stock status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((product) => (
                    <tr key={product._id}>
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={isChecked[product._id]}
                          onChange={() =>
                            setIsChecked({
                              ...isChecked,
                              [product._id]: !isChecked[product._id],
                            })
                          }
                        />
                      </td>

                      <td>
                        <img
                          src={product.image}
                          alt={product.productname}
                          className={styles["product-image"]}
                        />
                      </td>
                      <td>{product.productname}</td>
                      <td>{product.price}</td>
                      <td>{product.stock <= 0 ? "Out of Stock" : "In Stock"}</td>
                      <td>
                        <button onClick={() => handleDeleteItem(product)}>
                          <XCircleFill
                            size={24}
                            color="gray"
                            className="delete-icon"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={nextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div>No products in your wishlist yet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyWishlist;
