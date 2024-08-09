// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Navigation from "./NavBar";
//
// function CategoryForm() {
//     const [categoryName, setCategoryName] = useState('');
//     const [message, setMessage] = useState('');
//     const [categories, setCategories] = useState([]);
//
//     const fetchCategories = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:5001/api/categories', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCategories(response.data);
//             console.log('Fetched categories:', response.data);
//         } catch (err) {
//             console.error('Error fetching categories:', err);
//         }
//     };
//
//     useEffect(() => {
//         fetchCategories();
//     }, []);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(
//                 'http://localhost:5001/api/categories',
//                 { categoryName },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             console.log('Response:', response.data);
//             setMessage('Category added successfully!');
//             fetchCategories();  // Fetch updated categories
//         } catch (err) {
//             console.error('Error adding category:', err);
//             setMessage('Error adding category');
//         }
//     };
//
//     return (
//         <div>
//             <Navigation/>
//             <h2>Add Category</h2>
//             {message && <p>{message}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Category Name:</label>
//                     <input
//                         type="text"
//                         value={categoryName}
//                         onChange={(e) => setCategoryName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Add Category</button>
//             </form>
//             <h2>Your Categories</h2>
//             {categories.length > 0 ? (
//                 <ul>
//                     {categories.map((category) => (
//                         <li key={category.id}>
//                             <Link to={`/category-events/${category.id}`}>{category.name}</Link>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No categories found.</p>
//             )}
//         </div>
//     );
// }
//
// export default CategoryForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from "./NavBar";
import { API_HOST } from '../config';


function CategoryForm() {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_HOST + '/api/categories', {
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
    }, []);

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
            fetchCategories();  // Fetch updated categories
        } catch (err) {
            console.error('Error adding category:', err);
            setMessage(err.response?.data?.message || 'Error adding category');
        }
    };

    return (
        <div>
            <Navigation/>
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
            <h2>Your Categories</h2>
            {categories.length > 0 ? (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link to={`/category-events/${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
}

export default CategoryForm;
