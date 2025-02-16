// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import BackButton from './BackButton';
// import Logout from './Logout';
// import { API_HOST } from '../config';
//
//
// const Navigation = () => {
//     const [categoriesExist, setCategoriesExist] = useState(false);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(API_HOST + '/api/events/categories', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 console.log('Categories fetched:', response.data); // Log the fetched categories
//                 setCategoriesExist(response.data.length > 0);
//             } catch (err) {
//                 console.error('Error fetching categories:', err);
//             }
//         };
//
//         fetchCategories();
//     }, []);
//
//     return (
//         <nav className="navbar bg-base-100">
//             <div className="flex-1">
//                 <a className="btn btn-ghost normal-case text-xl">React Crud</a>
//             </div>
//             <div className="flex-none">
//                 <div className="dropdown dropdown-end lg:hidden">
//                     <label tabIndex={0} className="btn btn-ghost">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M4 6h16M4 12h8m-8 6h16"
//                             />
//                         </svg>
//                     </label>
//                     <ul tabIndex={0}
//                         className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                         <li><Link to="/dashboard" className="btn btn-ghost text-xl">Home</Link></li>
//                         {categoriesExist &&
//                             <li><Link to="/event-form" className="btn btn-ghost text-xl">Add Event</Link></li>}
//                         {categoriesExist &&
//                             <li><Link to="/event-table" className="btn btn-ghost text-xl">View Events</Link></li>}
//                         <li><Link to="/category-form" className="btn btn-ghost text-xl">Add Category</Link></li>
//                         <li><BackButton className="btn btn-ghost text-xl"/></li>
//                         <li><Logout className="btn btn-ghost text-xl"/></li>
//                     </ul>
//                 </div>
//                 <div className="hidden lg:flex">
//                     <Link to="/dashboard" className="btn btn-ghost text-xl">Home</Link>
//                     {categoriesExist && <Link to="/event-form" className="btn btn-ghost text-xl">Add Event</Link>}
//                     {categoriesExist && <Link to="/event-table" className="btn btn-ghost text-xl">View Events</Link>}
//                     <Link to="/category-form" className="btn btn-ghost text-xl">Add Category</Link>
//                     <BackButton className="btn btn-ghost text-xl"/>
//                     <Logout className="btn btn-ghost text-xl"/>
//                 </div>
//             </div>
//         </nav>
//
//     );
// };
//
// export default Navigation;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from './BackButton';
import Logout from './Logout';
import { API_HOST } from '../config';

const Navigation = () => {
    const [categoriesExist, setCategoriesExist] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_HOST + '/api/events/categories', {
                    headers: { Authorization: `Bearer ${token}` },
                });
               // console.log('Categories fetched:', response.data); // Log the fetched categories
                setCategoriesExist(response.data.length > 0);
            } catch (err) {
               // console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">React Crud</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li><Link to="/dashboard" className="btn btn-ghost text-xl">Home</Link></li>
                        {categoriesExist &&
                            <li><Link to="/event-form" className="btn btn-ghost text-xl">Add Event</Link></li>}
                        {categoriesExist &&
                            <li><Link to="/event-table" className="btn btn-ghost text-xl">View Events</Link></li>}
                        <li><Link to="/category-form" className="btn btn-ghost text-xl">Add Category</Link></li>
                        <li><Link to="/chart" className="btn btn-ghost text-xl">View Chart</Link></li>
                        {/* New Chart link */}
                        <li><Link to="/upload" className="btn btn-ghost text-xl">Upload Image</Link></li>
                        <li><Link to="/imageView" className="btn btn-ghost text-xl">View Images</Link></li>
                        <li><BackButton className="btn btn-ghost text-xl"/></li>
                        <li><Logout className="btn btn-ghost text-xl"/></li>
                    </ul>
                </div>
                <div className="hidden lg:flex">
                    <Link to="/dashboard" className="btn btn-ghost text-xl">Home</Link>
                    {categoriesExist && <Link to="/event-form" className="btn btn-ghost text-xl">Add Event</Link>}
                    {categoriesExist && <Link to="/event-table" className="btn btn-ghost text-xl">View Events</Link>}
                    <Link to="/category-form" className="btn btn-ghost text-xl">Add Category</Link>
                    <Link to="/chart" className="btn btn-ghost text-xl">View Chart</Link> {/* New Chart link */}
                    <Link to="/upload" className="btn btn-ghost text-xl">Upload Image</Link>
                    <Link to="/imageView" className="btn btn-ghost text-xl">View Images</Link>
                    <BackButton className="btn btn-ghost text-xl"/>
                    <Logout className="btn btn-ghost text-xl"/>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
