import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    const cleanDescription = (description) => {
        if (!description) return '';
        return description.replace(/!\[.*?\]\(.*?\)/g, '').replace(/\*\*/g, '').replace(/\\r\\n/g, ' ').trim();
    };

    const eventSlotImages = {
    26658: ['https://i.postimg.cc/VvzfXR4H/slot-1-2.png', 'https://i.postimg.cc/wTTxvw11/slot-3-4.png', 'https://i.postimg.cc/Bnjq5tcs/slot-5-6.png', 'https://i.postimg.cc/qRT4dwfM/slot-7-12.png', 'https://i.postimg.cc/4y4GY3ND/slot-1314.png', 'https://i.postimg.cc/fW5Z6Y8D/slot-15-16.png', 'https://i.postimg.cc/fyb4wg8Z/slot-17-18.png', 'https://i.postimg.cc/wxW8WgBB/slot-19-120.png'], // Event ID 1
    2: ['slot2_image_url1.jpg', 'slot2_image_url2.jpg'], // Event ID 2
    // Add more event IDs with corresponding slot images
};

    const fetchEvents = async () => {
        setLoadingEvents(true); // Start loading
        try {
            const response = await axios.get('https://mavimods.serv00.net/backtest.php');
            if (response.data && !response.data.error) {
                setEvents(response.data.upcoming_events);
            } else {
                console.error('Error fetching events:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoadingEvents(false); // Stop loading
        }
    };

    const fetchBookings = async () => {
    if (selectedEvent && selectedEvent.name) {
        setLoadingBookings(true); // Start loading
        const formattedEventName = selectedEvent.name.replace(/\s+/g, '/');
        const bookingUrl = `https://bookback.koyeb.app/api/bookings/${encodeURIComponent(formattedEventName)}`;
        try {
            const response = await axios.get(bookingUrl);
            setBookings(response.data); // Only approved bookings are fetched from the backend
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoadingBookings(false); // Stop loading
        }
    }
};

    const handleBooking = async (e) => {
        e.preventDefault();
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
            <h1>Slot Booking for {selectedEvent ? selectedEvent.name : 'Event'}</h1>
            <form onSubmit={handleBooking}>
                <select onChange={(e) => handleEventSelect(e.target.value)} value={eventId} required>
                    <option value="">Select an Event</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>

                {selectedEvent && (
    <div className="event-description">
        <p>{cleanDescription(selectedEvent.description)}</p>

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

            <h2>Current Bookings for {selectedEvent ? selectedEvent.name : 'Event'}</h2>
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
                         
