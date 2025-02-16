// import React, {useState} from 'react';
// import axios from 'axios';
// import {useNavigate, Link} from 'react-router-dom';
// import BiometricLogin from './BiometricLogin';
// import BackButton from "./BackButton";
// import { API_HOST } from '../config';
//
// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(API_HOST + '/api/login', {username, password});
//             console.log('Login response:', response.data); // Log entire response data
//
//             // Ensure userId is stored if present
//             if (response.data.userId) {
//                 console.log('User Id: ' + response.data.userId);
//                 localStorage.setItem('userId', response.data.userId); // Store userId
//             } else {
//                 console.log('No id present');
//             }
//
//             localStorage.setItem('token', response.data.token); // Store token
//             localStorage.setItem('username', username); // Store username
//             console.log('Token: ' + response.data.token);
//             //check local storage
//             console.log('Stored token:', localStorage.getItem('token'));
//             console.log('Stored userId:', localStorage.getItem('userId'));
//             console.log('Stored username:', localStorage.getItem('username'));
//
//             // Navigate to dashboard after successful login
//             console.log('Navigating to /dashboard'); // Log navigation action
//             navigate('/dashboard');
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.message) {
//                 setError(err.response.data.message);
//             } else {
//                 setError('Invalid credentials');
//             }
//         }
//     };
//
//
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//
//     // return (
//     //     <div>
//     //         <h2>Login</h2>
//     //         {error && <p style={{color: 'red'}}>{error}</p>}
//     //         <form onSubmit={handleLogin}>
//     //             <div>
//     //                 <label>Username:</label>
//     //                 <input
//     //                     type='text'
//     //                     value={username}
//     //                     onChange={(e) => setUsername(e.target.value)}
//     //                     required
//     //                 />
//     //             </div>
//     //             <div>
//     //                 <label>Password:</label>
//     //                 <div style={{position: 'relative'}}>
//     //                     <input
//     //                         type={showPassword ? 'text' : 'password'}
//     //                         value={password}
//     //                         onChange={(e) => setPassword(e.target.value)}
//     //                         required
//     //                         style={{paddingRight: '30px'}}
//     //                     />
//     //                     <span
//     //                         onClick={togglePasswordVisibility}
//     //                         style={{
//     //                             position: 'absolute',
//     //                             right: '10px',
//     //                             top: '50%',
//     //                             transform: 'translateY(-50%)',
//     //                             cursor: 'pointer',
//     //                         }}
//     //                     >
//     //                         {showPassword ? '👁️' : '🙈'}
//     //                     </span>
//     //                 </div>
//     //             </div>
//     //             <button type='submit'>Login</button>
//     //         </form>
//     //         <p>
//     //             Don't have an account? <Link to='/register'>Register here</Link>
//     //         </p>
//     //         <p>
//     //             <Link to='/forgotPassword'>Forgot Password</Link>
//     //         </p>
//     //     </div>
//     // );
//     return (
//         <>
//             <div className="navbar bg-base-100">
//                 <a className="btn btn-ghost text-xl">React Crud</a>
//              </div>
//         <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
//             <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-xl rounded-lg">
//                 <div className="card-body">
//                     <h2 className="card-title text-center text-2xl font-bold mb-6">Login</h2>
//                     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                     <form onSubmit={handleLogin}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700">Username:</label>
//                             <input
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                                 className="input input-bordered w-full"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700">Password:</label>
//                             <div className="relative">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     className="input input-bordered w-full pr-10"
//                                 />
//                                 <span
//                                     onClick={togglePasswordVisibility}
//                                     className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//                                 >
//                   {showPassword ? '👁️' : '🙈'}
//                 </span>
//                             </div>
//                         </div>
//                         <button type="submit" className="btn btn-primary w-full">Login</button>
//                     </form>
//                     <p className="text-center mt-4">
//                         Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
//                     </p>
//                     <p className="text-center mt-2">
//                         <Link to="/forgotPassword" className="text-primary">Forgot Password?</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//             </>
//     );
// }
//
// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import FacialRecognition from './FacialRecognition';
import { API_HOST } from '../config';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [useFacialRecognition, setUseFacialRecognition] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_HOST + '/api/login', { username, password });
            handleLoginSuccess(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    const handleLoginSuccess = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', username);
        navigate('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="navbar bg-base-100">
                <a className="btn btn-ghost text-xl">React Crud</a>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
                <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-xl rounded-lg">
                    <div className="card-body">
                        <h2 className="card-title text-center text-2xl font-bold mb-6">Login</h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                        <div className="flex justify-center mb-4">
                            <div className="btn-group">
                                <button
                                    className={`btn ${!useFacialRecognition ? 'btn-active' : ''}`}
                                    onClick={() => setUseFacialRecognition(false)}
                                >
                                    Password
                                </button>
                                <button
                                    className={`btn ${useFacialRecognition ? 'btn-active' : ''}`}
                                    onClick={() => setUseFacialRecognition(true)}
                                >
                                    Face ID
                                </button>
                            </div>
                        </div>

                        {useFacialRecognition ? (
                            <FacialRecognition onLoginSuccess={() => navigate('/dashboard')} />
                        ) : (
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Username:</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password:</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="input input-bordered w-full pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </form>
                        )}

                        <p className="text-center mt-4">
                            Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
                        </p>
                        <p className="text-center mt-2">
                            <Link to="/forgotPassword" className="text-primary">Forgot Password?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;