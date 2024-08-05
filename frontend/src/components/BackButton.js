import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <button onClick={handleBack} style={{ margin: '10px' }}>
            Back
        </button>
    );
}

export default BackButton;
