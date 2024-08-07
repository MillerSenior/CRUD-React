// import React, { useState } from 'react';
// import axios from 'axios';
//
// function CategoryForm() {
//   const [categoryName, setCategoryName] = useState('');
//   const [message, setMessage] = useState('');
//
//   // CategoryForm.js
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//           'http://localhost:5001/api/categories',
//           { categoryName },  // Ensure categoryName is properly set
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//       );
//       console.log('Response:', response.data);
//       setMessage('Category added successfully!');
//     } catch (err) {
//       console.error('Error adding category:', err);
//       setMessage('Error adding category');
//     }
//   };
//
//
//
//
//   return (
//     <div>
//       <h2>Add Category</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Category Name:</label>
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Category</button>
//       </form>
//     </div>
//   );
// }
//
// export default CategoryForm;
import React, { useState } from 'react';
import axios from 'axios';

function CategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:5001/api/categories',
          { categoryName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      console.log('Response:', response.data);
      setMessage('Category added successfully!');
    } catch (err) {
      console.error('Error adding category:', err);
      setMessage('Error adding category');
    }
  };

  return (
      <div>
        <h2>Add Category</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category Name:</label>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
  );
}

export default CategoryForm;
