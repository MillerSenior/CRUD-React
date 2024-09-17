// Spinner.js
import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner">
            <svg className="spinner__circle" width="50" height="50" viewBox="0 0 50 50">
                <circle className="spinner__path" cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" />
            </svg>
        </div>
    );
};

export default Spinner;
