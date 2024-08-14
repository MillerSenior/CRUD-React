import React from 'react';
import ImageView from '../components/ImageView';
import { useParams } from 'react-router-dom';
import Navigation from "../components/NavBar";

const ImageViewPage = () => {
    const { id } = useParams();

    return (
        <div className="image-view-page">
            <Navigation/>
            <h2>View Image</h2>
            <ImageView imageId={id} />
        </div>
    );
};

export default ImageViewPage;
