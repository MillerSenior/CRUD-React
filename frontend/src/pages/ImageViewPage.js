import React from 'react';
//import ImageView from '../components/ImageView';
import { useParams } from 'react-router-dom';
import Navigation from "../components/NavBar";
import UserImages from "../components/UserImages";

const ImageViewPage = () => {
    const { id } = useParams();

    return (
        <div className="image-view-page">
            <Navigation/>
            {/*<ImageView imageId={id} />*/}
            <UserImages/>
        </div>
    );
};

export default ImageViewPage;
