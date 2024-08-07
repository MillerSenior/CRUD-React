import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './NavBar';
import { useNavigate } from 'react-router-dom';

function EventTable() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        console.log('Fetched events:', response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

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

    fetchEvents();
    fetchCategories();
  }, []);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/events/${eventToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e.id !== eventToDelete.id));
      setShowDeleteModal(false);
      setEventToDelete(null);
      setMessage('Event deleted successfully!');
    } catch (err) {
      console.error('Error deleting event:', err);
      setMessage('Error deleting event');
    }
  };
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const eventDetails = {
        eventName: editingEvent.name,  // Change 'name' to 'eventName'
        date: editingEvent.date,
        time: editingEvent.time,
        attendees: editingEvent.attendees,
        categoryId: editingEvent.category_id,  // Change 'category_id' to 'categoryId'
      };
      console.log('Event Details:', eventDetails);  // Log the event details
      const response = await axios.put(`http://localhost:5001/api/events/${editingEvent.id}`, eventDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response);  // Log the response
      setEvents(events.map((e) => (e.id === editingEvent.id ? editingEvent : e)));
      setEditingEvent(null);
      navigate('/event-table');  // Redirect to event table page after successful edit
      setMessage('Event updated successfully!');
    } catch (err) {
      console.error('Error updating event:', err);
      console.log('Error Response:', err.response);  // Log the error response
      setMessage('Error updating event');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({
      ...editingEvent,
      [name]: value,
    });
  };

  const resetForm = () => {
    setEditingEvent(null);
  };

  return (
      <div>
        <Navigation />
        <h2>Event Table</h2>
        {message && <p>{message}</p>}
        {editingEvent ? (
            <div>
              <h3>Edit Event</h3>
              <form onSubmit={handleEditFormSubmit}>
                <div>
                  <label>Event Name:</label>
                  <input
                      type="text"
                      name="name"
                      value={editingEvent.name}
                      onChange={handleFormChange}
                      required
                  />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                      type="date"
                      name="date"
                      value={editingEvent.date}
                      onChange={handleFormChange}
                      required
                  />
                </div>
                <div>
                  <label>Time:</label>
                  <input
                      type="time"
                      name="time"
                      value={editingEvent.time}
                      onChange={handleFormChange}
                      required
                  />
                </div>
                <div>
                  <label>Number of Attendees:</label>
                  <input
                      type="number"
                      name="attendees"
                      value={editingEvent.attendees}
                      onChange={handleFormChange}
                      required
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select
                      name="category_id"
                      value={editingEvent.category_id}
                      onChange={handleFormChange}
                      required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Update Event</button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </form>
            </div>
        ) : (
            <>
              {events.length > 0 ? (
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
                          <td>{event.name}</td>
                          <td>{event.date}</td>
                          <td>{event.time}</td>
                          <td>{event.attendees}</td>
                          <td>
                            <button onClick={() => handleEdit(event)}>Edit</button>
                            <button onClick={() => handleDelete(event)}>Delete</button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
              ) : (
                  <p>No events found.</p>
              )}
            </>
        )}

        {showDeleteModal && (
            <div className="modal">
              <p>Are you sure you want to delete this event?</p>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
        )}
      </div>
  );
}

export default EventTable;
