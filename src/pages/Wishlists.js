import React from 'react';
import styles from './Wishlists.module.css';
import { fetchWishlist } from '../store/wishlists/wishlists';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WishlistTableRow from './../components/WishlistTableRow';

const MyWishlist = () => {
  const dispatch = useDispatch();
  const { loading, wishlist, error } = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>Wishlist</h2>
        </div>
        {wishlist.length > 0 && (
          <table className={styles['wishlist-table']}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Product name</th>
                <th>Unit price</th>
                <th>Stock status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map(product => (
                <WishlistTableRow key={product._id} product={product} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
