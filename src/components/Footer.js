import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-1">
      <div className="container" style={{ marginTop: "20px", marginBottom: "5px"}}>
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>At Bloomos, we're passionate about spreading happiness through the language of flowers.</p>
          </div>
          <div className="col-md-4">
            <h5>&emsp;&emsp;&emsp;&emsp;Quick Links</h5>
            <ul className="list-unstyled" style={{marginLeft: "100px"}}>
              <li><a href="/about-us#our-story" className="text-white" style={{textDecoration: "none"}}>Our Story</a></li>
              <li><a href="/about-us#our-mission" className="text-white" style={{textDecoration: "none"}}>Our Mission</a></li>
              <li><a href="/about-us#contact-us" className="text-white" style={{textDecoration: "none"}}>Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
  <h5>Connect</h5>
  <ul className="list-unstyled">
    <li>
      <i className="fas fa-envelope"></i> <a href="mailto:info@pethaven.com" className="text-white">Email</a>
    </li>
    <li>
      <i className="fas fa-phone"></i> <a href="tel:123-456-7890" className="text-white">Call</a>
    </li>
    <li>
      Follow: 
      <a href="https://www.facbook.com/" className="text-white ml-2" ><i className="fab fa-facebook-f" ></i>&emsp;</a>
      <a href="https://www.twitter.com/" className="text-white ml-3"><i className="fab fa-twitter"></i>&emsp;</a>
      <a href="https://www.instagram.com/" className="text-white ml-3"><i className="fab fa-instagram">&ensp;</i></a>
    </li>
  </ul>
</div>
</div>
</div>

    </footer>
  );
};

export default Footer;
