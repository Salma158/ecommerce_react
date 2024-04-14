import styles from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../store/cart/cart";
import { useEffect } from "react";
import { removeFromCart, updateCart } from "../../store/cart/cart";
import { Trash } from "react-bootstrap-icons";
import Button from "../../components/Button";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom'; // Import Link from React Router
import LoadingSpinner from "../components/LoadingSpinner"; 



const MyCart = () => {
  const dispatch = useDispatch();
  let { loading, cart, error } = useSelector((state) => state.cart);
  const handleDeleteItem = (product) => {
    dispatch(removeFromCart(product._id));
  };
  const handleUpdateItem = (product, actionType) => {
    dispatch(updateCart({ productId: product._id, actionType }));
  };
  
 
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
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
                <th>Quantity</th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.productname}
                      className={styles["product-image"]}
                    />
                  </td>
                  <td>{item.productname}</td>
                  <td>{item.price} EGP</td>
                  <td>{item.stock <= 0 ? "Out of Stock" : "In Stock"}</td>
                  <td>{item.quantity}</td>
                  <td>
                  <Button onClick={() => handleDeleteItem(item)}
                  backgroundColor="transparent"
                  color="gray"
                  text={<Trash size={24} color="green" className="delete-icon" />}
                  width="auto"
                  height="auto"
                  />
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Button onClick={() => handleUpdateItem(item, 'Decrease')}
                      backgroundColor="transparent"
                      color="red"
                      text={<RemoveCircleIcon size={24} className="delete-icon" />}
                      width="auto"
                      height="auto"
                      />
                      <Button onClick={() => handleUpdateItem(item, 'Increase')}
                      backgroundColor="transparent"
                      color="green"
                      text={<AddCircleIcon size={24} className="add-icon" />}
                      width="auto"
                      height="auto"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No products in your Cart yet</div>
        )}
        <div className="d-flex justify-content-between pt-3">
          <Link to="/address"> {/* Link to the shipping address page */}
            <Button
              text="Next"
              width="100px"
              height="auto"
              backgroundColor="#000000"
              color="#ffffff"
              marginLeft="450px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

