import React from 'react';
import ImageUpload from '../components/ImageUpload';
import Navigation from "../components/NavBar";

const ImageUploadPage = () => {
    return (
        <div className="image-upload-page">
            <Navigation/>
            <h2>Upload an Image</h2>
            <ImageUpload />
        </div>
    );
};

export default ImageUploadPage;
