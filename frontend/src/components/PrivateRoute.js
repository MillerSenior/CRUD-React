import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log("Starting PrivateRoute component...");

        if (token) {
            console.log('User authenticated.');
            setIsAuthenticated(true);
        } else {
            console.log('Token not found. Redirecting to login...');
            setIsAuthenticated(false);
        }

        const logInterval = setInterval(() => {
            console.log('Logging at 20-second interval...');
        }, 20000); // Log every 20 seconds

        // Clean up interval on unmount or component re-render
        return () => {
            clearInterval(logInterval);
            console.log('Logging interval cleared.');
        };
    }, []); // Empty dependency array to run only on mount

    if (isAuthenticated === null) {
        // Render nothing or a loading indicator while authentication state is being determined
        return null;
    }

    if (isAuthenticated) {
        console.log('Rendering protected route...');
        return <Outlet />;
    } else {
        console.log('Redirecting to login...');
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
