import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingHours, setOpeningHours] = useState({});


    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://demo.vshops.fi/api/shop/6565b5f6fa8c3dea523c531f');
                const data = await response.json();
                // Extract shopName from the theme array
                const { addressLine1, addressLine2, city, state, pincode } = data?.data?.address || {};
                setAddressLine1(addressLine1 || '');
                setAddressLine2(addressLine2 || '');
                setCity(city || '');
                setState(state || '');
                setPinCode(pincode || '');
                const phoneNumber = data?.data?.phoneNumber || '';
                setPhoneNumber(phoneNumber || '');
                const hours = data?.data?.shopTiming || {};
                setOpeningHours(hours);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="contact container-fluid expand-lg"id="contact">
            <p className='heading'>Contact</p>
            <div className="contact-details d-lg-flex" id="contact">
                <div className="leftContainer">
                    <div className="addressContainer">
                        <h3 className="contactHeadings" id="addressHeading">Address</h3>
                        <div className="line1">
                            <span id="addressLine1">{addressLine1}</span>
                            <span>,</span>
                            <span id="addressLine2"> {addressLine2}</span>
                        </div>
                        <div className="line2">
                            <span id="city">{city}</span>
                            <span>,</span>
                            <span id="state"> {state}</span>
                            <span>,</span>
                            <span id="pinCode"> {pinCode}</span>
                        </div>
                    </div>
                    <div className="phNumContainer">
                        <h3 className="contactHeadings" id="contactNum">Contact</h3>
                        <i id="callIcon" className="fa-solid fa-phone"></i>
                        <p id="phoneNumber">{phoneNumber}</p>
                    </div>
                    <div className="openHrContainer">
                        <h3 className="openHours" id="openHours">Opening Hours</h3>
                        <div id="nostyle">
                            <table className="table-responsive-md table-borderless" id="openHoursTable">
                                <tbody>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <tr key={day}>
                                            <td id="days">{day}</td>
                                            <td>{openingHours[day.toLowerCase()]?.opening}</td>
                                            <td>-</td>
                                            <td>{openingHours[day.toLowerCase()]?.closing}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="rightContainer">
                    <div className="googleMapContainer">
                        <iframe className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1985.3384601551527!2d24.739046677111904!3d60.15857557502649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df51c29036d3d%3A0x54b58c8521a054f3!2sMatinkatu%205%2C%2002230%20Espoo!5e0!3m2!1sfi!2sfi!4v1713173173866!5m2!1sfi!2sfi"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact