// // import React, { useState, useEffect } from 'react';
// //
// // const StateDropdown = ({ onSelect }) => {
// //     const [states, setStates] = useState([]);
// //
// //     useEffect(() => {
// //         fetch('/api/us-states/state-data')
// //             .then(response => response.json())
// //             .then(data => setStates(data))
// //             .catch(error => console.error('Error fetching states:', error));
// //     }, []);
// //
// //     return (
// //         <select onChange={(e) => onSelect(e.target.value)}>
// //             <option value="">Select a state</option>
// //             {states.map(state => (
// //                 <option key={state.state_name} value={state.state_name}>
// //                     {state.state_name}
// //                 </option>
// //             ))}
// //         </select>
// //     );
// // };
// //
// // export default StateDropdown;
// import React, { useState, useEffect } from 'react';
// import { API_HOST } from '../config';
//
// const StateDropdown = ({ onSelect }) => {
//     const [states, setStates] = useState([]);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchStates = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`${API_HOST}/api/us-states`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//
//                 const data = await response.json();
//                 setStates(data);
//             } catch (error) {
//                 console.error('Error fetching states:', error);
//                 setError('Failed to fetch states');
//             }
//         };
//
//         fetchStates();
//     }, []);
//
//     if (error) {
//         return <p>{error}</p>;
//     }
//
//     return (
//         <select onChange={(e) => onSelect(e.target.value)}>
//             <option value="">Select a state</option>
//             {states.map(state => (
//                 <option key={state.state_name} value={state.state_name}>
//                     {state.state_name}
//                 </option>
//             ))}
//         </select>
//     );
// };
//
// export default StateDropdown;
import React, { useState, useEffect } from 'react';
import { API_HOST } from '../config';

const StateDropdown = ({ onSelect }) => {
    const [states, setStates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_HOST}/api/us-states`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.error('Error fetching states:', error);
                setError('Failed to fetch states');
            }
        };

        fetchStates();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select a state</option>
            {states.map(state => (
                <option key={state.state_name} value={state.state_name}>
                    {state.state_name}
                </option>
            ))}
        </select>
    );
};

export default StateDropdown;
