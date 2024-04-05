import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categories/slices/categorySlice'; 
import CategoryCard from '../components/CategoryCard'; 
import "./Categories.css"
import Button from "../components/Button"; // Import your Button component
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Categories() { 
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categories); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row className="align-items-center"> {}
        <Col>
          <h1 className='categories'>Categories</h1>
        </Col>
        <Col className="productButton">
    <Link to="/products">
        <Button text="Products" backgroundColor="#000000" color="#ffffff" /> {}
    </Link>
</Col>

      </Row>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
            <CategoryCard category={category} /> {}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;
