import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventTable() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Event Table</h2>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Number of Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.eventName}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.attendees}</td>
              <td>
                {/* Add buttons for editing, deleting, and adding images */}
                <button>Edit</button>
                <button>Delete</button>
                <button>Add Image</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
