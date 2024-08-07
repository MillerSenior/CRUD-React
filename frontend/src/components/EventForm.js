// import React, { useState } from 'react';
// import axios from 'axios';
//
// function EventForm() {
//   const [eventName, setEventName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [attendees, setAttendees] = useState(0);
//   const [message, setMessage] = useState('');
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5001/api/events',
//         { eventName, date, time, attendees },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage('Event added successfully!');
//     } catch (err) {
//       setMessage('Error adding event');
//     }
//   };
//
//   return (
//     <div>
//       <h2>Add Event</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Event Name:</label>
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Time:</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Number of Attendees:</label>
//           <input
//             type="number"
//             value={attendees}
//             onChange={(e) => setAttendees(parseInt(e.target.value))}
//             required
//           />
//         </div>
//         <button type="submit">Add Event</button>
//       </form>
//     </div>
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/events/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
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
      const response = await axios.post(
          'http://localhost:5001/api/events',
          { eventName, date, time, attendees, categoryId: selectedCategory },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      setMessage('Event added successfully!');
    } catch (err) {
      console.error('Error adding event:', err);
      setMessage('Error adding event');
    }
  };

  return (
      <div>
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
                  <option key={category.id} value={category.id}>
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
