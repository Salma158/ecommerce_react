
import React from 'react';

const Button = ({ onClick, text, width, height, backgroundColor, color, disabled }) => {
  const buttonStyle = {
    width: width || 'auto',
    height: height || 'auto',
    textDecoration: 'none', // Corrected property name
    backgroundColor: backgroundColor || '#007bff',
    color: color || '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button onClick={onClick} style={buttonStyle} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
