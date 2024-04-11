
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from './Button';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
// import { addToWishlist, removeFromWishlist } from '../store/wishlists/wishlists';
import { addItemToWishlist, deleteWishlistItem  } from './../store/wishlists/wishlist-actions'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { wishlistActions  } from "../store/wishlists/wishlist-slice";



import StarRating from "./StarRating";

import flower from '../assets/images/flower.jpg';

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistItems.some(item => item._id === product._id));
  }, [dispatch]);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (isInWishlist) {
      dispatch(deleteWishlistItem(product._id));
    } else {
      dispatch(addItemToWishlist(product._id));
    }
  };

//   const averageRating = product && product.average_rating ? parseFloat(product.average_rating).toFixed(1) : 0;

  return (
    <Card className={`my-3 p-3 rounded product-card ${product.stock <= 0 ? 'out-of-stock' : ''}`}>
      {product.stock <= 0 && (
        <div className="out-of-stock-label">Out of Stock</div>
      )}
      {product.stock > 0 && (
        <div className="wishlist-icon" onClick={toggleWishlist}>
          <FontAwesomeIcon icon={faHeart} color={isInWishlist ? 'red' : 'black'} />
        </div>
      )}
      {/* <Link to={`/product/${product._id}`}>
      <Card.Img
  src={product.image || flower}
  alt={product.productname}
  className="product-image"
/>

      </Link> */}
      <Link to={`/product/${product._id}`}>
  <Card.Img
    src={product.image || flower}
    alt={product.productname}
    className="product-image"
    // Add console.log to debug
    // onLoad={() => console.log('Image loaded successfully')}
    // onError={() => console.log('Error loading image')}
  />
</Link>

      <Card.Body className="d-flex flex-column">
        <div className="product-details">
          <Card.Title className="product-name">{product.productname}</Card.Title>
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
            className={`add-to-cart-button ${product.stock <= 0 ? 'out-of-stock' : ''}`}
            text="Add to Cart"
            width="100%"
            height="40px"
            backgroundColor={product.stock <= 0 ? '#ccc' : '#000'}
            color="#ffffff"
            disabled={product.stock <= 0}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
