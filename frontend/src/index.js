import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete axios.defaults.headers.common['Authorization'];
}

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);