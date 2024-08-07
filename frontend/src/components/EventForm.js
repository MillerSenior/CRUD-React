// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// function EventForm() {
//   const [eventName, setEventName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [attendees, setAttendees] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [message, setMessage] = useState('');
//
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5001/api/events/categories', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCategories(response.data);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };
//
//     fetchCategories();
//   }, []);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//           'http://localhost:5001/api/events',
//           { eventName, date, time, attendees, categoryId: selectedCategory },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//       );
//       setMessage('Event added successfully!');
//     } catch (err) {
//       console.error('Error adding event:', err);
//       setMessage('Error adding event');
//     }
//   };
//
//   return (
//       <div>
//         <h2>Add Event</h2>
//         {message && <p>{message}</p>}
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Event Name:</label>
//             <input
//                 type="text"
//                 value={eventName}
//                 onChange={(e) => setEventName(e.target.value)}
//                 required
//             />
//           </div>
//           <div>
//             <label>Date:</label>
//             <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//             />
//           </div>
//           <div>
//             <label>Time:</label>
//             <input
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 required
//             />
//           </div>
//           <div>
//             <label>Number of Attendees:</label>
//             <input
//                 type="number"
//                 value={attendees}
//                 onChange={(e) => setAttendees(parseInt(e.target.value))}
//                 required
//             />
//           </div>
//           <div>
//             <label>Category:</label>
//             <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Add Event</button>
//         </form>
//       </div>
//   );
// }
//
// export default EventForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventForm() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attendees, setAttendees] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

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

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const eventDetails = { eventName, date, time, attendees, categoryId: selectedCategory };
      if (isEditing) {
        await axios.put(
            `http://localhost:5001/api/events/${editEventId}`,
            eventDetails,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('Event updated successfully!');
        setIsEditing(false);
        setEditEventId(null);
      } else {
        await axios.post(
            'http://localhost:5001/api/events',
            eventDetails,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('Event added successfully!');
      }
      fetchEvents();
      resetForm();
    } catch (err) {
      console.error('Error adding/updating event:', err);
      setMessage('Error adding/updating event');
    }
  };

  const handleEdit = (event) => {
    setEventName(event.name);
    setDate(event.date);
    setTime(event.time);
    setAttendees(event.attendees);
    setSelectedCategory(event.category_id.toString());
    setIsEditing(true);
    setEditEventId(event.id);
    console.log('Editing event:', event);
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Event deleted successfully!');
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      setMessage('Error deleting event');
    }
  };

  const resetForm = () => {
    setEventName('');
    setDate('');
    setTime('');
    setAttendees(0);
    setSelectedCategory('');
    setIsEditing(false);
    setEditEventId(null);
  };

  return (
      <div>
        <h2>{isEditing ? 'Edit Event' : 'Add Event'}</h2>
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
          <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
          {isEditing && <button type="button" onClick={resetForm}>Cancel Edit</button>}
        </form>

        <h2>Your Events</h2>
        {events.length > 0 ? (
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Attendees</th>
                <th>Category</th>
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
                    <td>{categories.find((cat) => cat.id === event.category_id)?.name}</td>
                    <td>
                      <button onClick={() => handleEdit(event)}>Edit</button>
                      <button onClick={() => handleDelete(event.id)}>Delete</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p>No events found.</p>
        )}
      </div>
  );
}

export default EventForm;