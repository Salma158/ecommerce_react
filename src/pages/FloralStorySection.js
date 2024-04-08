// FloralStorySection.js
import React from 'react';
import './FlolarStory.css'; 
import flowerimage from "../assets/images/flower.jpg"

const FloralStorySection = () => {
  return (
    <div className="floral-story-container">
      <div className="floral-story-image">
        <img src={flowerimage} />
      </div>
      <div className="floral-story-text">
        <h2>Our Floral Journey</h2>
        <p>
          At Bloomos, we believe in the transformative power of flowers. Our journey began with a simple love for nature's most delicate and vibrant creations.
        </p>
        <p>
          From cultivating a small garden to attending floral workshops and collaborating with local growers, [Your Business Name] has always been rooted in creativity and innovation.
        </p>
        <p>
          We take pride in curating the finest selection of blooms from around the world. Whether it's a romantic bouquet of roses, a vibrant arrangement of tropical flowers, or a whimsical display of wildflowers, each creation at [Your Business Name] is a celebration of nature's palette.
        </p>
        <p>
          As stewards of the environment, we are committed to sustainable practices that minimize our ecological footprint. From eco-friendly packaging to supporting local farmers and reducing waste, we strive to nurture and protect the planet that inspires us.
        </p>
        <p>
          Join us on our floral journey and let's celebrate the beauty of nature together. Follow us on social media [@YourSocialMediaHandles] for the latest updates, floral inspiration, and behind-the-scenes glimpses into our world.
        </p>
      </div>
    </div>
  );
};

export default FloralStorySection;
