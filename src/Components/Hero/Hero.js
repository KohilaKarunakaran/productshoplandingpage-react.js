import React, { useState, useEffect } from 'react';
import './Hero.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = () => {
    const [data, setData] = useState([]);
    const [shopData, setShopData] = useState(null);
    const [price, setPrices] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/foods/6565b5f6fa8c3dea523c531f');
                const jsonData = await response.json();
                setData(jsonData.data); // Assuming the data is stored directly in the response
                setPrices(jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    console.log("Data:", data);

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleButtonClick = () => {
        // Redirect to the new page
        window.location.href = 'https://demo.vshops.fi/shop/6565b5f6fa8c3dea523c531f?search=';
    };

    return (
        <div className="hero container-fluid" id="hero">
            <div className="hero-text">
                <Slider {...settings} className="products-list container-fluid w-3/4 m-auto " id="products">
                {Array.isArray(data) && data.length > 0 && data.filter(item =>
                    item.previewStatus === "active" && item.status === "active"
                ).length > 0 ? (
                    data.filter(item =>
                        item.previewStatus === "active" && item.status === "active"
                    ).map((item, index) => (
                            <div key={index} className="cards">
                                <div className="card-img-top">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h4>{item.names[0].name}</h4>
                                    </div>
                                    <div className='price'>
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
                                    <button onClick={handleButtonClick} className="btn btn-secondary custom-button" style={{ backgroundColor: "#8916EE", color: '#fff', borderRadius: '5px', padding: '10px 20px', fontSize: '20px' }}>ORDER NOW</button>
                                </div>
                            </div>
                        ))
                    ) : null}
                </Slider>
            </div>
        </div>
    )
                                            }    
export default Hero;
