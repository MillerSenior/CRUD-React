import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from "../config";
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './UserImages.css';

const UserImages = () => {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${API_HOST}/api/imageView/user-images`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setImages(response.data);
        } catch (error) {
            console.error('Failed to fetch images', error);
        }
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleDelete = async (imageId, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`${API_HOST}/api/images/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchImages(); // Refresh the image list
        } catch (error) {
            console.error('Failed to delete image', error);
        }
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const navigateImage = (direction) => {
        const newIndex = selectedImageIndex + direction;
        if (newIndex >= 0 && newIndex < images.length) {
            setSelectedImageIndex(newIndex);
        }
    };

    return (
        <div className="user-images-container">
            <div className="image-grid">
                {images.map((image, index) => (
                    <div key={image.id} className="image-wrapper" onClick={() => handleImageClick(index)}>
                        <img
                            src={`data:${image.mime_type};base64,${image.image_data}`}
                            alt={image.file_name}
                            className="user-image"
                        />
                        <div className="image-overlay">
                            <button
                                className="delete-btn"
                                onClick={(e) => handleDelete(image.id, e)}
                            >
                                <Trash2 size={20} />
                            </button>
                            <p className="image-filename">{image.file_name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImageIndex !== null && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>×</button>
                        {selectedImageIndex > 0 && (
                            <button className="nav-btn prev" onClick={() => navigateImage(-1)}>
                                <ChevronLeft size={30} />
                            </button>
                        )}
                        <img
                            src={`data:${images[selectedImageIndex].mime_type};base64,${images[selectedImageIndex].image_data}`}
                            alt={images[selectedImageIndex].file_name}
                            className="modal-image"
                        />
                        {selectedImageIndex < images.length - 1 && (
                            <button className="nav-btn next" onClick={() => navigateImage(1)}>
                                <ChevronRight size={30} />
                            </button>
                        )}
                        <p className="modal-filename">{images[selectedImageIndex].file_name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserImages;