import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import EventTable from './components/EventTable';
import CategoryForm from './components/CategoryForm';
import PrivateRoute from './components/PrivateRoute';
import CategoryEvents from "./components/CategoryEvents";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private Routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/event-form" element={<EventForm />} />
                    <Route path="/event-form/:id" element={<EventForm />} /> {/* New route for editing */}
                    <Route path="/event-table" element={<EventTable />} />
                    <Route path="/category-form" element={<CategoryForm />} />
                    <Route path="/category-events/:categoryId" element={<CategoryEvents />} />
                </Route>

                {/* Default route */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;