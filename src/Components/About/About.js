import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [shopDescription, setShopDescription] = useState('');

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/shop/6565b5f6fa8c3dea523c531f');
                const data = await response.json();
                // Extract shopDescription 
                const description = data?.data?.description || '';
                setShopDescription(description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="about container-fluid expand-lg">
            <p className='heading'>About</p>
            {shopDescription && (
                <p className='content'>{shopDescription}</p>)}
        </div>
    )
}
export default About
