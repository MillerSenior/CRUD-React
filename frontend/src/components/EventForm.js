import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './NavBar';

function EventForm() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attendees, setAttendees] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/events/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
        console.log('Fetched categories:', response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const eventDetails = { eventName, date, time, attendees, categoryId: selectedCategory };
      await axios.post('http://localhost:5001/api/events', eventDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Event added successfully!');
      navigate('/event-table');  // Redirect to event table page after successful submission
    } catch (err) {
      console.error('Error adding event:', err);
      setMessage('Error adding event');
    }
  };

  return (
      <div>
        <Navigation />
        <h2>Add Event</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name:</label>
            <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Time:</label>
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Number of Attendees:</label>
            <input
                min={1}
                type="number"
                value={attendees}
                onChange={(e) => setAttendees(parseInt(e.target.value))}
                required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
  );
}

export default EventForm;
