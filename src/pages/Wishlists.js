import React from 'react';
import { useSelector } from 'react-redux';
import WishlistItem from '../components/WishlistItem';
import './Wishlists.css';

const MyWishlist = props => {
  const wishlist = useSelector(state =>
    state.shop.products.filter(p => p.isFavorite)
  );
  let content = <p className="placeholder">Got no wishlist products yet!</p>;
  if (wishlist.length > 0) {
    content = (
      <ul className="products-list">
        {wishlist.map(prod => (
          <WishlistItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default MyWishlist;
