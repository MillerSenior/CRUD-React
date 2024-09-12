import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from "../config";

const UserImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/imageView/user-images`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data); // Log the data to check what’s being returned
                setImages(response.data);
            } catch (error) {
                console.error('Failed to fetch images', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h2>Your Images</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.isArray(images) && images.map(image => (
                    <div key={image.id} style={{ margin: '10px' }}>
                        <img
                            src={`data:${image.mime_type};base64,${image.image_data}`}
                            alt={image.file_name}
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                        <p>{image.file_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserImages;
