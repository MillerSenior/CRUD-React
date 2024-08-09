import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigation from "./NavBar";
import { API_HOST } from '../config';


function CategoryEvents() {
    const { categoryId } = useParams();
    const [events, setEvents] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_HOST + `/api/events/category/${categoryId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(response.data.events);
                setCategoryName(response.data.categoryName);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, [categoryId]);

    return (
        <div>
            <Navigation />
            <h2>Events in Category: {categoryName}</h2>
            {events.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Number of Attendees</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                            })}</td>
                            <td> {(() => {
                                const [hours, minutes, seconds] = event.time.split(':').map(Number);
                                const timeDate = new Date();
                                timeDate.setHours(hours);
                                timeDate.setMinutes(minutes);
                                timeDate.setSeconds(seconds);
                                return timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                            })()}</td>
                            <td>{event.attendees}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No events found for this category.</p>
            )}
        </div>
    );
}

export default CategoryEvents;
