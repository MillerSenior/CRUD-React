import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
console.log('in the register component');
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log('Register button clicked:', { username, email });

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            console.log('Passwords do not match');
            return;
        }

        try {
            console.log('Sending registration request to server');
            const response = await axios.post('http://localhost:5001/api/register', {
                username,
                password,
                email
            });

            console.log('Registration successful:', response.data); // Log the response data

            localStorage.setItem('token', response.data.token);
            console.log('Stored token:', response.data.token); // Log the stored token

            localStorage.setItem('userId', response.data.userId); // Save user ID
            console.log('Stored userId:', response.data.userId); // Log the stored userId

            localStorage.setItem('username', username); // Store username
            console.log("From regiser:"+ username);

          navigate('/dashboard');

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(err.response.data.message);
                console.log('Registration error:', err.response.data.message);
            } else {
                setError('Registration failed');
                console.error('Registration error:', err);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // return (
    //     <div>
    //         <h2>Register</h2>
    //         {error && <p style={{ color: 'red' }}>{error}</p>}
    //         <form onSubmit={handleRegister}>
    //             <div>
    //                 <label>Username:</label>
    //                 <input
    //                     type="text"
    //                     value={username}
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label>Email:</label>
    //                 <input
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label>Password:</label>
    //                 <div style={{ position: 'relative' }}>
    //                     <input
    //                         type={showPassword ? 'text' : 'password'}
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         required
    //                         style={{ paddingRight: '30px' }}
    //                     />
    //                     <span
    //                         onClick={togglePasswordVisibility}
    //                         style={{
    //                             position: 'absolute',
    //                             right: '10px',
    //                             top: '50%',
    //                             transform: 'translateY(-50%)',
    //                             cursor: 'pointer',
    //                         }}
    //                     >
    //                         {showPassword ? '👁️' : '🙈'}
    //                     </span>
    //                 </div>
    //             </div>
    //             <div>
    //                 <label>Confirm Password:</label>
    //                 <input
    //                     type={showPassword ? 'text' : 'password'}
    //                     value={confirmPassword}
    //                     onChange={(e) => setConfirmPassword(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Register</button>
    //         </form>
    //         <BackButton />
    //     </div>
    // );
    return (
        <>
            <div className="navbar bg-base-100">
                <a className="btn btn-ghost text-xl">React Crud</a>
                <div className="navbar-end">
                    <BackButton className="btn btn-secondary w-full"/>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
                <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-xl rounded-lg">
                <div className="card-body">
                    <h2 className="card-title text-center text-2xl font-bold mb-6">Register</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleRegister}>
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
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                >
                  {showPassword ? '👁️' : '🙈'}
                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm Password:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Register</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
