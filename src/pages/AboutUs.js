import React from 'react';
import FlowerImage from '../assets/images/flower2.jpg'; 

import './AboutUsPage.css';
const AboutUsPage = () => {
    return (
      <div className="section" style={{ backgroundImage: `url(${FlowerImage})` }}>
        <div className="section-container">
          <h1 className="heading">Welcome to Bloomos</h1>
          <p className="paragraph">
            Where dreams blossom and stories unfold. At Bloomos, we're more than just a flower shop; we're a sanctuary of beauty and wonder, waiting to enchant you with the magic of nature.
          </p>
          <a href="#our-story" className="call-to-action">Discover Our Story</a>
        </div>
  
        <div id="our-story" className="section-container">
          <h2 className="heading">Our Story</h2>
          <p className="paragraph">
            In the heart of a bustling city, amidst the chaos and noise, there lies a secret garden – Bloomos. Founded by a group of passionate flower enthusiasts, our journey began with a single seed of inspiration and a vision to create a haven of tranquility where the beauty of flowers could bloom freely.
          </p>
          <p className="paragraph">
            From humble beginnings to becoming a beloved destination for flower lovers, our story is a testament to the power of dreams and the beauty of nature's creations.
          </p>
          <a href="#our-mission" className="call-to-action">Explore Our Mission</a>
        </div>
  
        <div id="our-mission" className="section-container">
          <h2 className="heading">Our Mission</h2>
          <p className="paragraph">
            At Bloomos, our mission is simple yet profound – to spread happiness, love, and positivity through the language of flowers. With each bouquet we create, we aim to weave a story of joy, celebration, and connection.
          </p>
          <p className="paragraph">
            We believe that every petal holds a promise of beauty, and every bloom has the power to brighten someone's day. That's why we pour our hearts and souls into every arrangement, ensuring that each one is a masterpiece of nature's finest.
          </p>
          <a href="#contact-us" className="call-to-action">Get In Touch</a>
        </div>
  
        <div id="contact-us" className="section-container">
          <h2 className="heading">Let's Connect</h2>
          <p className="paragraph">
            Ready to embark on a floral adventure with Bloomos? We'd love to hear from you! Whether you're planning a special event, looking for the perfect gift, or simply want to share your love for flowers, we're here to make your dreams blossom into reality.
          </p>
          <p className="paragraph">
            Connect with us on social media or drop by our store to say hello. Let's create beautiful memories together!
          </p>
          <a href="#our-story" className="call-to-action">Back to Top</a>
        </div>
      </div>
    );
  };
  
  export default AboutUsPage;