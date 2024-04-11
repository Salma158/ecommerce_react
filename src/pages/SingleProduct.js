
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchProductReviews, postProductReview } from '../store/products/slices/productDetailsSlice';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import './SingleProduct.css';
import flower from "../assets/images/flower.jpg"

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, reviews, error } = useSelector(state => state.productDetails);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRatingError, setShowRatingError] = useState(false);
  const [showReviewError, setShowReviewError] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(fetchProductReviews(id));
  }, [dispatch, id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowRatingError(false); 
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    setShowReviewError(false); 
  };

  const handleReviewSubmit = async () => {
    if (!rating) {
      setShowRatingError(true); 
      return;
    }
    if (!review) {
      setShowReviewError(true); 
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authorization token not found');
      }

      await dispatch(postProductReview({ productId: id, reviewData: { rating, comment: review } }));
      dispatch(fetchProductDetails(id));

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000); 

      setRating(0);
      setReview('');
    } catch (error) {
     
      if (error.message === 'Authorization token not found') {
        setShowLoginPopup(true);
        setTimeout(() => setShowLoginPopup(false), 2000); 
      } else {
        console.error('Error:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="single-product-container">
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading...
        </div>
      )}
      {error && !showLoginPopup && (
        <div className="error">Error: {error}</div>
      )}
      {product && (
        <div>
          <div className="product-details">
            <h1>{product.productname}</h1>
            <img src={product.image || flower} alt={product.productname} className="main-product-image" />
            <p>Brand: {product.productbrand}</p>
            <p>Price: ${product.price} EGP</p>
            <p>Number of reviews:  {product.num_reviews} </p>
            <div className="rating-section">
              <StarRating rating={rating} onChange={handleRatingChange} clickable />
              <span className="average-rating">{product.rating}</span>
            </div>
            <div className="button-container">
              <Button
                className={`add-to-cart-button ${product.stock <= 0 ? 'disabled' : ''}`}
                text="Add to Cart"
                width="100%"
                height="40px"
                backgroundColor="#000"
                color="#ffffff"
                disabled={product.stock <= 0}
              />
              {product.stock <= 0 && <div className="out-of-stock-label">Out of Stock</div>}
            </div>
          </div>
          <div className="additional-images">
            {product.images.map((image, index) => (
              <img key={index} src={image.image} alt={`Product ${index + 1}`} className="additional-product-image" />
            ))}
          </div>
          <div className="product-description">
            <h2>Description</h2>
            <p>{product.productinfo}</p>
          </div>
          <div className="customerReviews">
            <h2>Customer Reviews</h2>

            <div className="review-cards">
              {reviews && reviews.slice(0, 4).map(review => (
                <div key={review.id} className="review-card">

                  {/* <h3 className="review-card-title">{review.name}</h3> */}

                  <StarRating rating={review.rating} />
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">{formatDate(review.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="review-section">
            <div className="background-image"></div>
            <div className="feedback-container">
              <h2>Review</h2>
              <textarea
                value={review}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
              />
              {showRatingError && <div className="error">Please select a rating.</div>}
              {showReviewError && <div className="error">Please provide a review.</div>}
              <div className="button-container">
                <Button
                  className="submit button"
                  onClick={handleReviewSubmit}
                  text="Submit Review"
                  backgroundColor="#000"
                  color="#ffffff"
                  width="200px"
                  height="40px"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <div className="popup success">
          Thank you for your review!
        </div>
      )}
      {showLoginPopup && (
        <div className="popup failure">
          Please log in to submit a review.
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
