// import React from 'react';
// import { Link } from 'react-router-dom';
// import BackButton from './BackButton';
// import Logout from './Logout';
//
// const Navigation = () => {
//     return (
//         <nav>
//             <ul>
//                 <li><Link to="/dashboard">Home</Link></li>
//                 <li><Link to="/event-form">Add Event</Link></li>
//                 <li><Link to="/event-table">View Events</Link></li>
//                 <li><Link to="/category-form">Add Category</Link></li>
//                 <li><BackButton /></li>
//                 <li><Logout /></li>
//             </ul>
//         </nav>
//     );
// };
//
// export default Navigation;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from './BackButton';
import Logout from './Logout';

const Navigation = () => {
    const [categoriesExist, setCategoriesExist] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/events/categories', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategoriesExist(response.data.length > 0);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Home</Link></li>
                {categoriesExist && <li><Link to="/event-form">Add Event</Link></li>}
                {categoriesExist && <li><Link to="/event-table">View Events</Link></li>}
                <li><Link to="/category-form">Add Category</Link></li>
                <li><BackButton /></li>
                <li><Logout /></li>
            </ul>
        </nav>
    );
};

export default Navigation;
