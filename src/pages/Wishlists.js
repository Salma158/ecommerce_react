import styles from "./Wishlists.module.css";
import { fetchWishlist } from "../store/wishlists/wishlists";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import { removeFromWishlist } from '../store/wishlists/wishlists';

const MyWishlist = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  let { loading, wishlist, error } = useSelector((state) => state.wishlist);

  const handleDeleteItem = (product) => {
    dispatch(removeFromWishlist(product._id));
    wishlist = wishlist.filter((prod) => prod !== product._id )
  }

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch, wishlist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>Wishlist</h2>
        </div>
        {wishlist.length > 0 ? (
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
              {wishlist.map((product) => (
                <tr key={product._id}>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
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
        ) : (
          <div>No products in your wishlist yet</div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
