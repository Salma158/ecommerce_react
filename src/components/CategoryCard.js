import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CategoryCard.css'; 
import flower from'../assets/images/flower.jpg'

function CategoryCard({ category }) {
  const truncateDescription = (description) => {
    const periodIndex = description.indexOf('.');
    if (periodIndex !== -1) {
      return description.substring(0, periodIndex + 1);
    }
    return description;
  };

  return (
    <Link to={`/categories/${category.id}/products`} className="category-card-link">
      <Card className='my-3 rounded category-card'>
        <Card.Img src={category.image || flower} alt={category.categoryname} className="card-img-top" />
        <Card.Body>
          <Card.Title className="category-name">{category.categoryname}</Card.Title>
          <Card.Text className="category-description">{truncateDescription(category.description)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CategoryCard;
