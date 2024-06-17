import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Link } from 'react-scroll';


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [bannerImage, setBannerImage] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [activeMenu, setActiveMenu] = useState('home');

    const toggleMenu = () => {
        setOpenMenu(!openMenu); // Toggle the state between true and false
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setOpenMenu(false); // Close the menu when a menu item is clicked
      };

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/shop/6565b5f6fa8c3dea523c531f');
                const data = await response.json();
                // Extract bannerImage from the theme array
                const themeBannerImage = data?.data?.theme?.bannerImage || '';
                setBannerImage(themeBannerImage);
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
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: primaryColor }}>
          <div className="container">
            <Link className="navbar-brand" href="#">
              {bannerImage && <img src={bannerImage} alt="Banner" />}
            </Link>
            <div className='navBar-menu-container'>
              <HiOutlineBars3 onClick={toggleMenu} style={{ fontSize: 30 }} />
            </div>
    
            <div className={`collapse navbar-collapse ${openMenu ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="hero"
                    smooth={true}
                    offset={0}
                    duration={500}
                    style={{ color: secondaryColor }}
                    onClick={() => handleMenuClick('home')}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="about"
                    smooth={true}
                    offset={0}
                    duration={500}
                    style={{ color: secondaryColor }}
                    onClick={() => handleMenuClick('about')}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="products"
                    smooth={true}
                    offset={0}
                    duration={500}
                    style={{ color: secondaryColor }}
                    onClick={() => handleMenuClick('products')}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="contact"
                    smooth={true}
                    offset={0}
                    duration={500}
                    style={{ color: secondaryColor }}
                    onClick={() => handleMenuClick('contact')}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
}

export default Navbar;
