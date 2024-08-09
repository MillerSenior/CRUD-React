import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <>
            <Navigation/>
            <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
                <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6">
                    <div className="card-body">
                        <h2 className="text-3xl font-bold mb-4 text-center">Dashboard</h2>
                        <p className="text-lg text-center mb-6">Welcome, {username}!</p>
                    </div>
                </div>
            </div>
        </>


    );
}
