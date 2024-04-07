
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categories/slices/categorySlice'; 
import CategoryCard from '../components/CategoryCard'; 
import "./Categories.css"
import Button from "../components/Button"; 
import { Link } from "react-router-dom"; 

function Categories() { 
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categories); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#333' }}>
        <div className="loading-spinner" style={{ border: '4px solid rgba(0, 0, 0, 0.1)', borderLeftColor: '#333', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1 className='categories'>Categories</h1>
        </Col>
        <Col className="productButton">
          <Link to="/products">
            <Button text="Products" backgroundColor="#000000" color="#ffffff" />
          </Link>
        </Col>
      </Row>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;

