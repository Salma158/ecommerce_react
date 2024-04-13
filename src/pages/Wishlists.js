import styles from "./Wishlists.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import LoadingSpinner from "./../components/LoadingSpinner";
import { deleteWishlistItem } from "../store/wishlists/wishlist-actions";
import { fetchWishlist } from "../store/wishlists/wishlist-actions";

const MyWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const loading = useSelector((state) => state.wishlist.loading);

  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const next = useSelector((state) => state.wishlist.next);
  const previous = useSelector((state) => state.wishlist.previous);

  const handleDeleteItem = (id) => {
    dispatch(deleteWishlistItem(id));
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(fetchWishlist(currentPage + 1));
  };
  
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(fetchWishlist(currentPage - 1));
  };
  

  const [isChecked, setIsChecked] = useState({});

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Wishlist</h2>
          </div>
          {wishlist.length > 0 ? (
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
                  {wishlist.length > 0 &&
                    wishlist.map((product) => (
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
                        <td>
                          {product.stock <= 0 ? "Out of Stock" : "In Stock"}
                        </td>
                        <td>
                          <button onClick={() => handleDeleteItem(product._id)}>
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
                  disabled={previous === null}
                >
                  Previous
                </button>
                <span> 
               
                </span>
                <button
                  className="pagination-button"
                  onClick={nextPage}
                   disabled={next === null}
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
{
  /* {currentPage} / {totalPages}  */
}

export default MyWishlist;
