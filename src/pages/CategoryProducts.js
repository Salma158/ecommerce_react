

// CategoryProducts.js
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCategoryProducts } from '../store/products/slices/categoryProductsSlice';
import { fetchCategoryDetails } from '../store/categories/slices/categoryDetails';
import ProductCard from '../components/ProductCard';
import "./CategoryProducts.css"
import flower from '../assets/images/flower.jpg'

function CategoryProducts() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { products, loading: productLoading, error: productError } = useSelector(state => state.categoryProducts);
  const { categoryDetails, loading: categoryLoading, error: categoryError } = useSelector(state => state.categoryDetails);

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryId));
    dispatch(fetchCategoryDetails(categoryId)); 
  }, [dispatch, categoryId]);

  if (productLoading || categoryLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#333' }}>
        <div className="loading-spinner" style={{ border: '4px solid rgba(0, 0, 0, 0.1)', borderLeftColor: '#333', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        Loading...
      </div>
    );
  }

  if (productError || categoryError) {
    return <div>Error: {productError || categoryError}</div>;
  }

  return (
    <Container>
      <div className="category-details">
        <br />
        <br />
        <h2>{categoryDetails.categoryname}</h2>
        <img src={categoryDetails.image || flower} alt={categoryDetails.categoryname} className="category-image" />
        <p>{categoryDetails.description}</p>
      </div>
      <hr />
      <h3>Category Products</h3>
      <Row style={{marginBottom: "25px"}}>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryProducts;
