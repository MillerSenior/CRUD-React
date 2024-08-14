import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_HOST = 'http://localhost:5001'; // Adjust as needed

const ImageView = (input) => {
    const [imageData, setImageData] = useState(null);
    console.log('Input:', input);
const {id}=input;

    const fetchImage = async () => {
        try {
            const response = await axios.get(`${API_HOST}/api/images/${id}`, {
                responseType: 'arraybuffer', // Ensure binary data is correctly handled
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Convert binary data to base64
            const base64 = arrayBufferToBase64(response.data);
            const mimeType = response.headers['content-type'];
            const imageSrc = `data:${mimeType};base64,${base64}`;
            setImageData(imageSrc);
        } catch (error) {
            console.error('Failed to fetch image', error);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    useEffect(() => {
        fetchImage();
    }, [id]);

    return (
        <div>
            {imageData ? <img src={imageData} alt="Fetched" /> : <p>Loading image...</p>}
        </div>
    );
};

export default ImageView;
