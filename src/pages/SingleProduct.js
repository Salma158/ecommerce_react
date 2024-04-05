import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../store/products/slices/productDetailsSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {product && (
        <>
          <h1>{product.productname}</h1>
          <img src={product.image} alt={product.productname} />
          <p>Brand: {product.productbrand}</p>
          <p>Info: {product.productinfo}</p>
          <p>Rating: {product.rating}</p>
          <p>Price: ${product.price}</p>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
