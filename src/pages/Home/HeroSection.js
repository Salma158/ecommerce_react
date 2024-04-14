import React from "react";
import { Link } from "react-router-dom"; 
import flower from "../../assets/images/flower2.jpg";
import Header from "../../components/Navbar/Header";
import Button from "../../components/Button"; 
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-section">
      <Header isHeroHeader />
      <div className="hero-image" style={{ backgroundImage: `url(${flower})` }}>
        <div className="hero-content">
          <div className="hero-line">Let your dreams blossom</div>
          <div className="hero-line">with our floral wonders.</div>
          {}
          <Link to="/products">
            <Button text="Shop Now" backgroundColor="#ffffff" color="#000000"  marginTop={20} width={150} height={50}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
