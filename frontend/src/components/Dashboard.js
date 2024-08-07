import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import BackButton from "./BackButton";
import Navigation from "./NavBar";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    console.log("Token from dashboard: "+token);

    const userId = localStorage.getItem('userId');
    console.log("Id from dashboard: "+userId);

    const username = localStorage.getItem('username'); // Retrieve username
    console.log("Username from dashboard: "+username);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !userId) {
            // Redirect to login if no token or userId is found
            navigate('/login');
            return;
        }

        setLoading(false);
    }, [token, userId, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {username}!</p> {/* Display username */}
            <Navigation/>
        </div>
    );
}
