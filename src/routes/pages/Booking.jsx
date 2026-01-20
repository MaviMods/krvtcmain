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
        29732: ['https://i.postimg.cc/ry08kGgp/image.png', 'https://i.postimg.cc/1t0rnVrV/image.png', 'https://i.postimg.cc/mD4Qs2WL/image.png', 'https://i.postimg.cc/prXzmGd3/image.png', 'https://i.postimg.cc/SKfnc6H4/image.png', 'https://i.postimg.cc/HLFTcVkm/image.png', 'https://i.postimg.cc/6qtJnRsk/image.png', 'https://i.ibb.co/hRFd6DDy/Slot.png', 'https://i.ibb.co/DHGhpfDh/17-18.png', 'https://i.ibb.co/20ZRBTH5/19.png', 'https://i.ibb.co/qY7Zw1fb/20.png', 'https://i.ibb.co/CpdqJZkT/21-22.png', 'https://i.ibb.co/4w0h8Zh3/23-24-25.png', 'https://i.ibb.co/2YMV06MW/26.png', 'https://i.ibb.co/5XJH2qYF/27-31.png'],
        30217: ['https://i.postimg.cc/0Q9BDfLf/1.png', 'https://i.postimg.cc/52v7rTJg/2-3-4.png', 'https://i.postimg.cc/mkJjXN6K/5-6-7.png', 'https://i.postimg.cc/JnhQRdf9/8.png', 'https://i.postimg.cc/mkv3NZPs/9-10.png', 'https://i.postimg.cc/1z8pTNDQ/11-12.png', 'https://i.postimg.cc/zG7j4gvt/13-14.png', 'https://i.postimg.cc/QtTt1L5z/15-16.png', 'https://i.postimg.cc/XJFwvx30/17-18-19.png', 'https://i.postimg.cc/KvQt41X4/20-25.png', 'https://i.postimg.cc/bNYtXqGP/26-30.png', 'https://i.postimg.cc/qMYMmryj/31.png', 'https://i.postimg.cc/JnPRjCR3/32.png'],
        30726: ['https://i.ibb.co/5gJDBfCB/1-2-3-4.png', 'https://i.ibb.co/0ygKr1Wc/5-6.png', 'https://i.ibb.co/DgsBP0sB/7-8.jpg', 'https://i.ibb.co/pjFptSK5/9-10.jpg', 'https://i.ibb.co/HDcDkhM6/11-12-13.png', 'https://i.ibb.co/xtrk6z3r/14.png', 'https://i.ibb.co/27LfS6bc/15.png', 'https://i.ibb.co/MyZ1qNPW/16-17.png', 'https://i.ibb.co/Z6VvPsF1/18-20.png', 'https://i.ibb.co/MxzFnCvx/21.png', 'https://i.ibb.co/XxHhDsWz/22-24.png', 'https://i.ibb.co/mC04m30k/25-26.png', 'https://i.ibb.co/Z6vQnD7f/27-28.png', 'https://i.ibb.co/8n4cSj3t/29-31.png'],
        31575: ['https://i.ibb.co/67p3hLCt/1-2-3-4.png', 'https://i.ibb.co/KjYfJ5pD/5-6.png', 'https://i.ibb.co/8LzMfTjJ/7-8.png', 'https://i.ibb.co/5g90jvGC/9-10.png', 'https://i.ibb.co/WNLRcKMb/11-12-13.png', 'https://i.ibb.co/0RhXYpFg/14.png', 'https://i.ibb.co/ZbjtMts/15.png', 'https://i.ibb.co/DD626vQm/16-17.png', 'https://i.ibb.co/pvZfBZvt/18-20.png', 'https://i.ibb.co/7xVjDP59/21.png', 'https://i.ibb.co/CKMdqThP/22-23-24.png', 'https://i.ibb.co/1NRvKWZ/25-26.png', 'https://i.ibb.co/35bBHz6p/27-28.png', 'https://i.ibb.co/twr7MCH1/29-31.png'],  
        31574: ['https://i.postimg.cc/3JB18nMb/1-2.jpg', 'https://i.postimg.cc/Pq3rdGy3/3-4-5-6-7.jpg', 'https://i.postimg.cc/J7Jm2Bw7/8.jpg', 'https://i.postimg.cc/44vqcvkb/9-10-11-12.jpg', 'https://i.postimg.cc/3JJSDPFP/13-14-15.jpg', 'https://i.postimg.cc/0Ng0Z37b/16.jpg', 'https://i.postimg.cc/HsV0mH2x/17-18.jpg', 'https://i.postimg.cc/0QyMCdXb/19.jpg', 'https://i.postimg.cc/T3QW54QF/20-21.jpg', 'https://i.postimg.cc/KYR4kv1g/22-23-24-25.jpg', 'https://i.postimg.cc/66L6QGMD/26-27.jpg', 'https://i.postimg.cc/L54c5hsj/28.jpg', 'https://i.postimg.cc/KYys44q7/29-30.jpg', 'https://i.postimg.cc/q7LQRw65/31.jpg'],
        32757: ['https://i.postimg.cc/VN6Q7xNh/krvtc.jpg', 'https://i.postimg.cc/X7V2cwqC/1-2.jpg', 'https://i.postimg.cc/7hXnQWhG/3-4-5-6-7.jpg', 'https://i.postimg.cc/Mpgb4R6N/8.jpg', 'https://i.postimg.cc/fRSYxLct/9-10-11-12.jpg', 'https://i.postimg.cc/KvRT2zH8/13-14-15.jpg', 'https://i.postimg.cc/Nj8jqvBt/16.jpg', 'https://i.postimg.cc/T2ZbTGMY/17-18.jpg', 'https://i.postimg.cc/FRYfQCT6/19.jpg', 'https://i.postimg.cc/fR5kSQFB/20-21.jpg', 'https://i.postimg.cc/gcRJqZQ6/22-23-24-25.jpg', 'https://i.postimg.cc/zf6zTzkR/26-27.jpg', 'https://i.postimg.cc/tCpX3mhH/28.jpg', 'https://i.postimg.cc/V6X8Mj6G/29-30.jpg', 'https://i.postimg.cc/HsYgc8gH/31.jpg'],
        32623: ['https://i.postimg.cc/CKVh5McC/1.png'],
        33298: ['https://i.postimg.cc/CKVh5McC/1.png'],
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

                <input type="text" placeholder="VTC Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
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
