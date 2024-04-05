import React from 'react';

const Button = ({ onClick, text, width, height, backgroundColor, color }) => {
  const buttonStyle = {
    width: width || 'auto',
    height: height || 'auto',
    backgroundColor: backgroundColor || '#007bff',
    color: color || '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    outline: 'none',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {text}
    </button>
  );
};

export default Button;
