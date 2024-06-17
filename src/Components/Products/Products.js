import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
    const [data, setData] = useState([]);
    const [shopData, setShopData] = useState(null);
    const [price, setPrices] = useState([]);

    useEffect(() => {
        // Fetch data from API
        const fetchshopData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/shop/6565b5f6fa8c3dea523c531f');
                const jsonData = await response.json();
                setShopData(jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchshopData();
    }, []);


    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/foods/6565b5f6fa8c3dea523c531f');
                const jsonData = await response.json();
                setData(jsonData.data);  // Assuming the data is stored directly in the response
                setPrices(jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = () => {
        // Redirect to the new page
        window.location.href = 'https://demo.vshops.fi/shop/6565b5f6fa8c3dea523c531f?search=';
    };

    return (
        <div className="products container-fluid expand-lg" id="products">
            <p className='heading'>Products</p>
            <div className='products-list'>
                {data.filter(item => item.status === "active").length > 0 ? (
                    data.filter(item => item.categories && item.categories.length > 1).map((item, index) => (
                        item.status === "active" && (
                            <div key={index} className="card">
                                <img className="card-img-top" src={item.image} alt="" />
                                <div className="card-body">
                                    <div className="card-title text-center">
                                        <p>{item.names[0].name}</p>
                                    </div>
                                    <div className='price text-center'>
                                        <p>
                                            <span>Price: </span>
                                            {item.offerPrice !== null && item.offerPrice > 0 ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        {item.price}€
                                                    </span>{' '}
                                                    &nbsp; {item.offerPrice}€
                                                </>
                                            ) : (
                                                `${item.price}€`
                                            )}
                                        </p>
                                    </div>
                                    <button onClick={handleButtonClick} className="btn btn-secondary custom-button" style={{color: '#fff', borderRadius: '5px', padding: '10px 20px', fontSize: '10px' }}>ORDER NOW</button>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <p>There are no active events.</p>
                )}
            </div>
            <button onClick={handleButtonClick} className='more'>Click to view more Products</button>
        </div>
    );
    
}
export default Products
