import React from 'react';
import { Card } from 'react-bootstrap';
import './WishlistTableRow.css'

const WishlistTableRow = ({ product }) => {
  return (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td><img
          src={product.image}
          alt={product.productname}
          className="product-image"
        /></td>
      <td>{product.productname}</td>
      <td>{product.price}</td>
      <td>{product.stock <= 0 ? 'Out of Stock' : 'In Stock'}</td>
      <td></td>
    </tr>
  );
};

export default WishlistTableRow;
