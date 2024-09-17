import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from "../config";
import './UserImages.css'; // CSS for styling

const UserImages = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // To store the clicked image

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_HOST}/api/imageView/user-images`, {
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

    // Function to handle opening the modal
    const handleImageClick = (image) => {
        console.log("Image clicked:", image); // Add a log to check if this function runs
        setSelectedImage(image);  // Set the clicked image in state
    };

    // Function to handle closing the modal
    const closeModal = () => {
        console.log("Closing modal"); // Log to verify modal is closing
        setSelectedImage(null);  // Reset selected image to null, closing the modal
    };

    // Prevent event propagation to avoid modal closing when clicking on the image
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="user-images-container">
            <div className="image-grid">
                {Array.isArray(images) && images.map(image => (
                    <div key={image.id} className="image-wrapper" onClick={() => handleImageClick(image)}>
                        <img
                            src={`data:${image.mime_type};base64,${image.image_data}`}
                            alt={image.file_name}
                            className="user-image"
                        />
                        <p className="image-filename">{image.file_name}</p>
                    </div>
                ))}
            </div>

            {/* Modal for enlarged image view */}
            {selectedImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="image-modal-content" onClick={handleModalClick}>
                        <span className="close-btn" onClick={closeModal}>×</span>
                        <img
                            className="modal-image"
                            src={`data:${selectedImage.mime_type};base64,${selectedImage.image_data}`}
                            alt={selectedImage.file_name}
                        />
                        <p className="image-modal-filename">{selectedImage.file_name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserImages;
