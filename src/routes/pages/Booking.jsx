import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import './Booking.css';

const Booking = () => {
    const { themeTatailwind } = useDarkMode();
    const [eventId, setEventId] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [driver, setDriver] = useState('');
    const [company, setCompany] = useState('');
    const [username, setusername] = useState('');
    const [truckLink, setTruckLink] = useState('');
    const [slotNumber, setSlotNumber] = useState('');
    const [extraSlot, setExtraSlot] = useState('No');
    const [extraSlotNumber, setExtraSlotNumber] = useState('');
    const [bookings, setBookings] = useState([]);
    const [events, setEvents] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);

    // Function to strip HTML tags
    const stripHtmlTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, ''); // Remove all HTML tags
    };

    const eventSlotImages = {
        28565: ['https://i.postimg.cc/zDCgZ3y5/Slot.png', 'https://i.postimg.cc/MGLFSdrc/Slot-1.png', 'https://i.postimg.cc/YCGFPRgD/Slot-2.png', 'https://i.postimg.cc/c4XqzMZ3/Slot-3.png', 'https://i.postimg.cc/3Jp143fx/Slot-4.png', 'https://i.postimg.cc/G2xrm007/Slot-5.png', 'https://i.postimg.cc/WbXGJt6j/Slot-6.png', 'https://i.postimg.cc/qRDr3sRy/Slot-7.png', 'https://i.postimg.cc/jSnh0tPb/Slot-8.png', 'https://i.postimg.cc/FsbKt1Mx/SLOT-22-24.png', 'https://i.postimg.cc/ncFyzzs2/slot-25-56.png', 'https://i.postimg.cc/43sVCr2Y/slot-27.png', 'https://i.postimg.cc/7ZgWDJDm/slot-28-29.png', 'https://i.postimg.cc/j5J8gD8H/slot-30.png', 'https://i.postimg.cc/9Ff9C6hS/slot-31.png', 'https://i.postimg.cc/d1L0zYdm/slot-32.png', 'https://i.postimg.cc/25xvzrVs/slot-33-37.png', 'https://i.postimg.cc/TY36cHmm/Slot-9.png'],
        29516: ['https://i.postimg.cc/66DCBHMf/12.png', 'https://i.postimg.cc/7ZS9vvDz/34.png', 'https://i.postimg.cc/BbB0X7fw/5.png', 'https://i.postimg.cc/ZqtVMbdp/6.png', 'https://i.postimg.cc/KzsTCfHw/78.png', 'https://i.postimg.cc/0yWwBxHZ/9101112.png', 'https://i.postimg.cc/6QVNQ5Jf/13.png', 'https://i.postimg.cc/N0Gw5vsh/14.png', 'https://i.postimg.cc/7PnMNvDt/1516.png', 'https://i.postimg.cc/qvy78rHz/17181920.png', 'https://i.postimg.cc/GpPJg6Gp/21222324.png', 'https://i.postimg.cc/Pqfzc24z/2526.png', 'https://i.postimg.cc/fLcz9jGp/2728.png', 'https://i.postimg.cc/nVS51QnP/29303132.png'],
        2: ['slot2_image_url1.jpg', 'slot2_image_url2.jpg'],
    };

    const fetchEvents = async () => {
        setLoadingEvents(true);
        try {
            const response = await axios.get('https://mavimods.serv00.net/backtest.php');
            if (response.data && !response.data.error) {
                setEvents(response.data.upcoming_events);
            } else {
                console.error('Error fetching events:', response.data.message);
                alert('Failed to fetch events. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('An error occurred while fetching events. Please check your connection.');
        } finally {
            setLoadingEvents(false);
        }
    };

    const fetchBookings = async () => {
        if (selectedEvent && selectedEvent.name) {
            setLoadingBookings(true);
            const formattedEventName = selectedEvent.name.replace(/\s+/g, '/');
            const bookingUrl = `https://bookback.koyeb.app/api/bookings/${encodeURIComponent(formattedEventName)}`;
            try {
                const response = await axios.get(bookingUrl);
                // Sort bookings by slotNumber
                const sortedBookings = response.data.sort((a, b) => {
                    return parseInt(a.slotNumber) - parseInt(b.slotNumber);
                });
                setBookings(sortedBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                alert('Failed to fetch bookings. Please try again later.');
            } finally {
                setLoadingBookings(false);
            }
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        // Validate slot numbers
        if (isNaN(slotNumber) || (extraSlot === 'Yes' && isNaN(extraSlotNumber))) {
            alert('Slot numbers must be numeric.');
            return;
        }

        if (extraSlot === 'Yes' && !extraSlotNumber) {
            alert('Extra Slot Number is required when selecting an extra slot.');
            return;
        }

        if (selectedEvent) {
            const bookingDetails = {
                username,
                driver,
                company,
                truckLink,
                slotNumber,
                extraSlot,
                extraSlotNumber: extraSlot === 'Yes' ? extraSlotNumber : '',
            };

            const formattedEventName = selectedEvent.name.replace(/\s+/g, '/');
            try {
                const response = await axios.post(`https://bookback.koyeb.app/api/bookings/${encodeURIComponent(formattedEventName)}`, bookingDetails);
                console.log('Booking successful:', response.data);
                alert('Booking request sent for approval.');
                // Clear the form fields after successful booking
                setDriver('');
                setCompany('');
                setusername('');
                setTruckLink('');
                setSlotNumber('');
                setExtraSlot('No');
                setExtraSlotNumber('');
                fetchBookings(); // Fetch bookings after a successful booking
            } catch (error) {
                console.error('Error booking slot:', error.response?.data || error.message);
                alert('Failed to book slot. Please try again.');
            }
        }
    };

    const handleEventSelect = (id) => {
        const event = events.find(event => event.id === parseInt(id));
        setEventId(id);
        setSelectedEvent(event || null);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [selectedEvent]);

    return (
        <div className={`container ${themeTatailwind}`}>
            <h1>Slot Booking for {selectedEvent ? stripHtmlTags(selectedEvent.name) : 'Event'}</h1>
            <form onSubmit={handleBooking}>
                <select onChange={(e) => handleEventSelect(e.target.value)} value={eventId} required>
                    <option value="">Select an Event</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {stripHtmlTags(event.name)}
                        </option>
                    ))}
                </select>

                {selectedEvent && (
                    <div className="event-description">
                        <ReactMarkdown>
                            {selectedEvent.description.replace(
                                /<p[^>]*>([\s\S]*?)<\/p>/g, // Match <p> tags
                                (match, p1) => stripHtmlTags(p1) // Remove HTML tags from the event name
                            )}
                        </ReactMarkdown>

                        {/* Display Multiple Slot Images in a Grid */}
                        {eventSlotImages[selectedEvent.id] && eventSlotImages[selectedEvent.id].length > 0 && (
                            <div className="slot-images-grid">
                                {eventSlotImages[selectedEvent.id].map((image, index) => (
                                    <a href={image} target="_blank" rel="noopener noreferrer" key={index}>
                                        <img src={image} alt={`Slot ${index + 1}`} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
                <input type="text" placeholder="Slot Number" value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} required />
                <input type="text" placeholder="Discord tag eg:mavi.mods" value={username} onChange={(e) => setusername(e.target.value)} required />
                <input type="text" placeholder="VTC TMP Link" value={truckLink} onChange={(e) => setTruckLink(e.target.value)} required />
                <input type="text" placeholder="Number of Drivers" value={driver} onChange={(e) => setDriver(e.target.value)} required />

                <select onChange={(e) => setExtraSlot(e.target.value)} value={extraSlot} required>
                    <option value="No">Need More Slot</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>

                {extraSlot === 'Yes' && (
                    <input
                        type="text"
                        placeholder="Extra Slot Number"
                        value={extraSlotNumber}
                        onChange={(e) => setExtraSlotNumber(e.target.value)}
                        required
                    />
                )}

                <button type="submit" disabled={loadingBookings}>Book Slot</button>
            </form>

            <h2>Current Bookings for {selectedEvent ? stripHtmlTags(selectedEvent.name) : 'Event'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Slot(s)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.company}</td>
                            <td>
                                {booking.slotNumber}
                                {booking.extraSlot === 'Yes' && ` + ${booking.extraSlotNumber}`}
                            </td>
                            <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Booking;
