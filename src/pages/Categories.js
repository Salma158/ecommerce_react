import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categories/slices/categorySlice'; 
import CategoryCard from '../components/CategoryCard'; 

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
      <h1>Categories</h1>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
            <CategoryCard category={category} /> {/* Render CategoryCard */}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;

