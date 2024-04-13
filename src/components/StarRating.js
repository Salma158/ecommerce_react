
import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onChange, clickable, color }) => {
  const handleClick = (value) => {
    if (clickable && onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const filled = index + 1 <= rating;
        return (
          <span
            key={index}
            onClick={() => handleClick(index + 1)}
            style={{ cursor: clickable ? 'pointer' : 'default', color: filled ? color : '#ccc' }}
          >
            <FaStar />
          </span>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  clickable: PropTypes.bool,
  color: PropTypes.string, 
};

StarRating.defaultProps = {
  onChange: null,
  clickable: false,
  color: 'black', 
};

export default StarRating;
