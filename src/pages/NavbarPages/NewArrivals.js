// NewArrivals.js
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewArrivals } from '../../store/products/slices/productsSlice';
import ProductCard from '../../components/Product/ProductCard';

function NewArrivals() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchNewArrivals());
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
      <h1 className='products' style={{ textAlign: 'center', fontFamily: 'Unna, serif',  marginTop: "0px" , fontWeight: "300px" , fontSize: "60px"}}>New Arrivals</h1>

      <Row style={{marginBottom: "30px"}}>
        {products && products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewArrivals;
