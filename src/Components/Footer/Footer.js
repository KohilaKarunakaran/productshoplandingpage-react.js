import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch('https://demo.vshops.fi/api/shop/6565b5f6fa8c3dea523c531f');
            const data = await response.json();
            const primaryColor = data?.data?.theme?.primaryColor || '';
            setPrimaryColor(primaryColor);
            const secondaryColor = data?.data?.theme?.secondaryColor || '';
            setSecondaryColor(secondaryColor);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="footer d-flex justify-content-center" style={{ backgroundColor: primaryColor }}>
            <p style={{ color: secondaryColor }}>Powered by VShop</p>
        </div>
  )
}

export default Footer
