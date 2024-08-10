import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './NavBar';
import { useNavigate } from 'react-router-dom';
import {API_HOST} from "../config";

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
        const response = await axios.get(API_HOST + '/api/events', {
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
        const response = await axios.get(API_HOST + '/api/events/categories', {
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
      await axios.delete(API_HOST +`/api/events/${eventToDelete.id}`, {
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
      const response = await axios.put(API_HOST +`/api/events/${editingEvent.id}`, eventDetails, {
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
      <>
        <Navigation/>

        <div className="card bg-base-100  shadow-2xl mx-auto mt-8 p-4">
          <h2 className="card-title text-center">Event Table</h2>
          {message && <p className="text-red-500 text-center">{message}</p>}

          {editingEvent ? (
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4">Edit Event</h3>
                <form onSubmit={handleEditFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold">Event Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={editingEvent.name}
                        onChange={handleFormChange}
                        required
                        className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={editingEvent.date}
                        onChange={handleFormChange}
                        required
                        className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={editingEvent.time}
                        onChange={handleFormChange}
                        required
                        className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Number of Attendees:</label>
                    <input
                        type="number"
                        name="attendees"
                        value={editingEvent.attendees}
                        onChange={handleFormChange}
                        required
                        className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Category:</label>
                    <select
                        name="category_id"
                        value={editingEvent.category_id}
                        onChange={handleFormChange}
                        required
                        className="select select-bordered w-full"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button type="submit" className="btn btn-primary">Update Event</button>
                    <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
          ) : (
              <>
                <div className="card-body overflow-x-auto">
                  {events.length > 0 ? (
                      <table className="table w-full">
                        <thead>
                        <tr>
                          <th>Event Name</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Number of Attendees</th>
                          <th></th>
                          <th></th>
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
                                return timeDate.toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                });
                              })()}</td>
                              <td>{event.attendees}</td>
                              <td>
                                <button onClick={() => handleEdit(event)}
                                        className="btn btn-secondary btn-sm mr-2">Edit
                                </button>
                              </td>
                              <td>
                                <button onClick={() => handleDelete(event)} className="btn btn-error btn-sm">Delete
                                </button>
                              </td>
                            </tr>

                        ))}
                        </tbody>
                      </table>
                  ) : (
                      <p className="text-center">No events found.</p>
                  )}
                </div>
              </>
          )}
        </div>

        {showDeleteModal && (
            <div className="modal modal-open">
              <div className="modal-box">
                <p>Are you sure you want to delete this event?</p>
                <div className="modal-action">
                  <button onClick={confirmDelete} className="btn btn-primary">Yes</button>
                  <button onClick={() => setShowDeleteModal(false)} className="btn">No</button>
                </div>
              </div>
            </div>
        )}
      </>
  );
}

export default EventTable;
