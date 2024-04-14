
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addItemToWishlist, deleteWishlistItem  } from '../../store/wishlists/wishlist-actions'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {addToCart} from '../../store/cart/cart'



import StarRating from "./StarRating";
import flower from "../../assets/images/flower.jpg";
import { getAuthToken } from '../../util/auth'
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const token = getAuthToken()
    if(token){
      setIsInWishlist(wishlistItems?.some(item => item._id === product._id));
    }
    }, [dispatch]);


  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (isInWishlist) {
      console.log("innn")
      dispatch(deleteWishlistItem(product._id));
    } else {
      dispatch(addItemToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    const token = getAuthToken();
  
    if (token) {
      dispatch(addToCart(product._id));
      alert("Product added to cart");
    } else {
      alert("Please login first");
    }
  };


  return (
    <Card
      className={`my-3 p-3 rounded product-card ${
        product.stock <= 0 ? "out-of-stock" : ""
      }`}
    >
      {product.stock <= 0 && (
        <div className="out-of-stock-label">Out of Stock</div>
      )}
      {product.stock > 0 && (
        <div className="wishlist-icon" onClick={toggleWishlist}>
          <FontAwesomeIcon
            icon={faHeart}
            color={isInWishlist ? "red" : "black"}
          />
        </div>
      )}
   
      <Link to={`/product/${product._id}`}>
  <Card.Img
    src={product.image || flower}
    alt={product.productname}
    className="product-image"
    
  />
</Link>

      <Card.Body className="d-flex flex-column">
        <div className="product-details">
          <Card.Title className="product-name">
            {product.productname}
          </Card.Title>
          <Card.Text>Brand: {product.productbrand}</Card.Text>
          {/* <Card.Text>Rating: {product.rating}</Card.Text> */}
          <Card.Text>Price: {product.price} EGP</Card.Text>
          <div className="rating-section">
            <StarRating rating={product.rating} color="black" />
            <span className="average-rating">{product.rating}</span>
          </div>
        </div>
        <div className="button-container">
          <Button
            onClick={handleAddToCart} // Call handleAddToCart function on click
            className={`add-to-cart-button ${product.stock <= 0 ? 'out-of-stock' : ''}`}
            text="Add to Cart"
            width="100%"
            height="40px"
            backgroundColor={product.stock <= 0 ? "#ccc" : "#000"}
            color="#ffffff"
            disabled={product.stock <= 0}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
