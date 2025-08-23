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
    const [currentSlide, setCurrentSlide] = useState(0);

    const stripHtmlTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
    };

    const eventSlotImages = {
        29516: ['https://i.postimg.cc/66DCBHMf/12.png', 'https://i.postimg.cc/7ZS9vvDz/34.png', 'https://i.postimg.cc/BbB0X7fw/5.png', 'https://i.postimg.cc/ZqtVMbdp/6.png', 'https://i.postimg.cc/KzsTCfHw/78.png', 'https://i.postimg.cc/0yWwBxHZ/9101112.png', 'https://i.postimg.cc/6QVNQ5Jf/13.png', 'https://i.postimg.cc/N0Gw5vsh/14.png', 'https://i.postimg.cc/7PnMNvDt/1516.png', 'https://i.postimg.cc/qvy78rHz/17181920.png', 'https://i.postimg.cc/GpPJg6Gp/21222324.png', 'https://i.postimg.cc/Pqfzc24z/2526.png', 'https://i.postimg.cc/fLcz9jGp/2728.png', 'https://i.postimg.cc/nVS51QnP/29303132.png'], 
        29795: ['https://i.postimg.cc/L5Z9csmB/image.png', 'https://i.postimg.cc/L5d56PC0/image.png', 'https://i.postimg.cc/HnHmh9PH/image.png', 'https://i.postimg.cc/W3mLgJpy/image.png', 'https://i.postimg.cc/d3qMBtLV/image.png', 'https://i.postimg.cc/BQn9P6rh/image.png', 'https://i.postimg.cc/HkFfNtVK/image.png', 'https://i.postimg.cc/wMxPNfGt/image.png', 'https://i.postimg.cc/ZKR2KQN2/image.png', 'https://i.postimg.cc/FzKWzfY3/image.png', 'https://i.postimg.cc/Y9r8D4fZ/image.png', 'https://i.postimg.cc/XJYccRn0/image.png'],
        29732: ['https://i.postimg.cc/ry08kGgp/image.png', 'https://i.postimg.cc/1t0rnVrV/image.png', 'https://i.postimg.cc/mD4Qs2WL/image.png', 'https://i.postimg.cc/prXzmGd3/image.png', 'https://i.postimg.cc/SKfnc6H4/image.png', 'https://i.postimg.cc/HLFTcVkm/image.png', 'https://i.postimg.cc/6qtJnRsk/image.png'],
        30217: ['https://i.postimg.cc/0Q9BDfLf/1.png', 'https://i.postimg.cc/52v7rTJg/2-3-4.png', 'https://i.postimg.cc/mkJjXN6K/5-6-7.png', 'https://i.postimg.cc/JnhQRdf9/8.png', 'https://i.postimg.cc/mkv3NZPs/9-10.png', 'https://i.postimg.cc/1z8pTNDQ/11-12.png', 'https://i.postimg.cc/zG7j4gvt/13-14.png', 'https://i.postimg.cc/QtTt1L5z/15-16.png', 'https://i.postimg.cc/XJFwvx30/17-18-19.png', 'https://i.postimg.cc/KvQt41X4/20-25.png', 'https://i.postimg.cc/bNYtXqGP/26-30.png', 'https://i.postimg.cc/qMYMmryj/31.png', 'https://i.postimg.cc/JnPRjCR3/32.png'],
        30528: ['https://i.imgur.com/d4ix7Jm.jpeg', 'https://i.imgur.com/yMzKels.jpeg', 'https://i.imgur.com/8ITuR4t.jpeg', 'https://i.imgur.com/Hb0sEKI.jpeg', 'https://i.imgur.com/ieO0X2E.jpeg', 'https://i.imgur.com/TBy3s3d.jpeg', 'https://i.imgur.com/4YrUQeN.jpeg', 'https://i.imgur.com/zRudRz1.jpeg', 'https://i.imgur.com/u4ulAO9.jpeg', 'https://i.imgur.com/MroHxWh.jpeg', 'https://i.imgur.com/Dzmvepu.jpeg', 'https://i.imgur.com/BI2PvG2.jpeg', 'https://i.imgur.com/hhhS3tS.jpeg'],
        2: ['slot2_image_url1.jpg', 'slot2_image_url2.jpg'],
    };

    const fetchEvents = async () => {
        setLoadingEvents(true);
        try {
            const response = await axios.get('https://mavimods.serv00.net/backtest.php');
            if (response.data && !response.data.error) {
                setEvents(response.data.upcoming_events);
            } else {
                alert('Failed to fetch events. Please try again later.');
            }
        } catch (error) {
            alert('An error occurred while fetching events.');
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
                const sortedBookings = response.data.sort((a, b) => parseInt(a.slotNumber) - parseInt(b.slotNumber));
                setBookings(sortedBookings);
            } catch (error) {
                alert('Failed to fetch bookings.');
            } finally {
                setLoadingBookings(false);
            }
        }
    };

    const nextSlide = () => {
        if (selectedEvent && eventSlotImages[selectedEvent.id]) {
            setCurrentSlide((prev) => (prev + 1) % eventSlotImages[selectedEvent.id].length);
        }
    };

    const prevSlide = () => {
        if (selectedEvent && eventSlotImages[selectedEvent.id]) {
            setCurrentSlide((prev) =>
                (prev - 1 + eventSlotImages[selectedEvent.id].length) % eventSlotImages[selectedEvent.id].length
            );
        }
    };

    useEffect(() => {
        setCurrentSlide(0);
    }, [selectedEvent]);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [selectedEvent]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (isNaN(slotNumber) || (extraSlot === 'Yes' && isNaN(extraSlotNumber))) {
            alert('Slot numbers must be numeric.');
            return;
        }

        if (extraSlot === 'Yes' && !extraSlotNumber) {
            alert('Extra Slot Number is required.');
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
                await axios.post(`https://bookback.koyeb.app/api/bookings/${encodeURIComponent(formattedEventName)}`, bookingDetails);
                alert('Booking request sent for approval.');
                setDriver('');
                setCompany('');
                setusername('');
                setTruckLink('');
                setSlotNumber('');
                setExtraSlot('No');
                setExtraSlotNumber('');
                fetchBookings();
            } catch {
                alert('Failed to book slot.');
            }
        }
    };

    const handleEventSelect = (id) => {
        const event = events.find(event => event.id === parseInt(id));
        setEventId(id);
        setSelectedEvent(event || null);
    };

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
                                /<p[^>]*>([\s\S]*?)<\/p>/g,
                                (match, p1) => stripHtmlTags(p1)
                            )}
                        </ReactMarkdown>

                        {eventSlotImages[selectedEvent.id]?.length > 0 && (
                            <div className="slot-slider">
                                {/* Prev Button - Outside Left */}
                                <button type="button" onClick={prevSlide} className="slide-btn prev-btn">‹</button>

                                <div className="slide-container">
                                    <a href={eventSlotImages[selectedEvent.id][currentSlide]} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={eventSlotImages[selectedEvent.id][currentSlide]}
                                            alt={`Slot ${currentSlide + 1}`}
                                            className="slide-image"
                                        />
                                    </a>
                                </div>

                                {/* Next Button - Outside Right */}
                                <button type="button" onClick={nextSlide} className="slide-btn next-btn">›</button>

                                <div className="slide-dots">
                                    {eventSlotImages[selectedEvent.id].map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                                            onClick={() => setCurrentSlide(index)}
                                        ></span>
                                    ))}
                                </div>
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
