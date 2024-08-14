import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            console.log("Checking authentication...");

            if (token) {
                console.log('User authenticated.');
                setIsAuthenticated(true);
            } else {
                console.log('Token not found. Redirecting to login...');
                setIsAuthenticated(false);
            }
        };

        checkAuth();

        // const logInterval = setInterval(() => {
        //     console.log('Logging at 20-second interval...');
        // }, 20000); // Log every 20 seconds
        //
        // return () => {
        //     clearInterval(logInterval);
        //     console.log('Logging interval cleared.');
        // };
    }, []);

    if (isAuthenticated === null) {
        // Render a loading indicator while authentication status is determined
        return <div>Loading...</div>;
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
