import styles from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart/cart";
import { useEffect } from "react";
import { removeFromCart } from "../store/cart/cart";
import { Trash } from "react-bootstrap-icons";
import Button from "../components/Button";



const MyCart = () => {
  const dispatch = useDispatch();
  let { loading, cart, error } = useSelector((state) => state.cart);
  const handleDeleteItem = (product) => {
    dispatch(removeFromCart(product._id));
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(loading)
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>My Cart</h2>
        </div>
        {cart.length > 0 ? (
          <table className={styles["wishlist-table"]}>
            <thead>
              <tr>
                <th></th>
                <th>Product Title</th>
                <th>Unit Price</th>
                <th>Stock Status</th>
                <th></th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id}>
                  <td>
                    <img
                      src={item.product.image}
                      alt={item.product.productname}
                      className={styles["product-image"]}
                    />
                  </td>
                  <td>{item.product.productname}</td>
                  <td>{item.product.price} EGP</td>
                  <td>{item.product.stock <= 0 ? "Out of Stock" : "In Stock"}</td>
                  <td>
                  <button onClick={() => handleDeleteItem(item.product)}>
                      <Trash
                        size={24}
                        color="gray"
                        className="delete-icon"
                      />
                    </button>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Button text="Left" backgroundColor="#007bff" />
                      <Button text="Remove" backgroundColor="#007bff" onClick={() => handleDeleteItem(item.product)}/>
                      <Button text="Right" backgroundColor="#007bff" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No products in your Cart yet</div>
        )}
      </div>
    </div>
  );
};

export default MyCart;