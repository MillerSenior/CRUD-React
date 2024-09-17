import React, { useState } from 'react';
import axios from 'axios';
import {API_HOST} from "../config";
import {useNavigate} from "react-router-dom";

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(API_HOST + '/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Image uploaded successfully');
            navigate('/api/imageView/user-images');
        } catch (error) {
            setMessage('Failed to upload image');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} required />
            <button type="submit">Upload Image</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ImageUpload;
