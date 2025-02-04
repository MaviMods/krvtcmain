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
    const [slotImages, setSlotImages] = useState([]);

    // Function to strip HTML tags
    const stripHtmlTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
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

    const fetchSlotImages = async (eventName) => {
        try {
            const response = await axios.get(`https://bookback.koyeb.app/slot-images/${encodeURIComponent(eventName)}`);
            if (response.data.success) {
                setSlotImages(response.data.slotImages);
            } else {
                console.error('Failed to fetch slot images:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching slot images:', error);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();

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
                setDriver('');
                setCompany('');
                setusername('');
                setTruckLink('');
                setSlotNumber('');
                setExtraSlot('No');
                setExtraSlotNumber('');
                fetchBookings();
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
        if (event) {
            fetchSlotImages(event.name);
        }
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
                        <p>{stripHtmlTags(selectedEvent.description)}</p>

                        {slotImages.length > 0 && (
                            <div className="slot-images-grid">
                                {slotImages.map((image, index) => (
                                    <a href={image.imageUrl} target="_blank" rel="noopener noreferrer" key={index}>
                                        <img src={image.imageUrl} alt={`Slot ${index + 1}`} />
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
                    <option value="">Need More Slot</option>
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
