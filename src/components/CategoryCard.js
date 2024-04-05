import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/category/${category.id}`}>
        <Card.Img src={category.image} alt={category.categoryname} />
      </Link>
      <Card.Body>
        <Card.Title>{category.categoryname}</Card.Title>
        <Card.Text>Description: {category.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;


