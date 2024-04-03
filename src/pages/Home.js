import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Container>
      <h1>Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              {/* Display the product image */}
              <Card.Img src={product.image} alt={product.productname} />

              <Card.Body>
                <Card.Title>{product.productname}</Card.Title>
                <Card.Text>Brand: {product.productbrand}</Card.Text>
                <Card.Text>Category: {product.productcategory.categoryname}</Card.Text>
                <Card.Text>Info: {product.productinfo}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                <Card.Text>Stock: {product.stock}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
