import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './NavBar';
import { API_HOST } from '../config';


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
        const response = await axios.get(API_HOST + '/api/events/categories', {
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
      await axios.post(API_HOST +'/api/events', eventDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Event added successfully!');
      navigate('/event-table');  // Redirect to event table page after successful submission
    } catch (err) {
      console.error('Error adding event:', err);
      setMessage('Error adding event');
    }
  };
//

  //
  return (
      <>
        <Navigation/>
        <div className="card bg-base-100 w-96 shadow-xl mx-auto mt-8">
          <div className="card-body">
            <h2 className="card-title">Add Event</h2>
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold">Event Name:</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-semibold">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-semibold">Time:</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-semibold">Number of Attendees:</label>
                <input
                    min={1}
                    type="number"
                    value={attendees}
                    onChange={(e) => setAttendees(parseInt(e.target.value))}
                    required
                    className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-semibold">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                    className="select select-bordered w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                      <option key={category.id} value={category.id.toString()}>
                        {category.name}
                      </option>
                  ))}
                </select>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}

export default EventForm;
