// Feature.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTruck, faStar } from '@fortawesome/free-solid-svg-icons';
import flowerImage from "../assets/images/flower.jpg";

const Feature = () => {
    return (
        <div style={{ marginTop: '100px', fontFamily: 'Unna, serif', backgroundSize: 'cover', backgroundPosition: 'center' }}> {/* Adding margin-top and setting font */}
            <header style={{ color: '#fff', padding: '20px', textAlign: 'center',  backgroundImage: `url(${flowerImage})` }}>
                <h1>Our Features</h1>
            </header>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <FontAwesomeIcon icon={faLock} size="3x" style={{ color: '#DE5285  ', marginBottom: '10px' }} />
                    <h2 style={{ fontSize: '24px', margin: '0' }}>SECURE PAYMENT</h2>
                    <p style={{ fontSize: '18px', margin: '0' }}>Secure payment service is provided to ensure the safety of payment transactions.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <FontAwesomeIcon icon={faTruck} size="3x" style={{ color: 'Bink', marginBottom: '10px' }} />
                    <h2 style={{ fontSize: '24px', margin: '0' }}>DELIVERED WITH CARE</h2>
                    <p style={{ fontSize: '18px', margin: '0' }}>We offer extremely careful delivery service to ensure the safe arrival of products.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <FontAwesomeIcon icon={faStar} size="3x" style={{ color: '#DE5285 	', marginBottom: '10px' }} />
                    <h2 style={{ fontSize: '24px', margin: '0' }}>EXCELLENT SERVICE</h2>
                    <p style={{ fontSize: '18px', margin: '0' }}>We provide excellent service to all our customers continuously.</p>
                </div>
            </div>
        </div>
    );
}

export default Feature;
