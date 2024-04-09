import React from "react";
import notFoundImage from "../assets/images/404not-found1.png"; 
import Button from "../components/Button"; 
import { Link } from "react-router-dom"; 

const NotFoundPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${notFoundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh'
  };

  return (
    <div style={backgroundStyle}>
      {/* Optionally, you can add some content or message */}
      <h1 style={{ color: '#fff', textAlign: 'center' }}>404 - Page Not Found</h1>
      <Link to="/">
            <Button text="Back Home" backgroundColor="#ffffff" color="#000000" marginTop="506px" marginLeft="600px" width="300px" height="50px" />
          </Link>
    </div>
  );
};

export default NotFoundPage;
