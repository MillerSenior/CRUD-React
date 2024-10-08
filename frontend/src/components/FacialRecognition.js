// import React, { useRef, useEffect, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import axios from 'axios';
// import { API_HOST } from '../config';
//
// const FacialRecognition = ({ onLoginSuccess }) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const loadModels = async () => {
//             try {
//                 setIsLoading(true);
//                 await Promise.all([
//                     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//                     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//                     faceapi.nets.faceRecognitionNet.loadFromUri('/models')
//                 ]);
//                 startVideo();
//             } catch (err) {
//                 setError('Failed to load facial recognition models');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadModels();
//     }, []);
//
//     const startVideo = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (err) {
//             setError('Unable to access camera');
//             console.error(err);
//         }
//     };
//
//     const handleVideoPlay = () => {
//         const canvas = canvasRef.current;
//         const video = videoRef.current;
//
//         if (!canvas || !video) return;
//
//         const displaySize = { width: video.width, height: video.height };
//         faceapi.matchDimensions(canvas, displaySize);
//
//         setInterval(async () => {
//             const detections = await faceapi
//                 .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
//                 .withFaceLandmarks()
//                 .withFaceDescriptor();
//
//             if (detections) {
//                 const faceDescriptor = Array.from(detections.descriptor);
//                 try {
//                     const response = await axios.post(`${API_HOST}/api/facial-login`, {
//                         faceDescriptor
//                     });
//
//                     if (response.data.token) {
//                         localStorage.setItem('token', response.data.token);
//                         localStorage.setItem('userId', response.data.userId);
//                         onLoginSuccess();
//                     }
//                 } catch (err) {
//                     console.error('Face authentication failed:', err);
//                 }
//             }
//
//             const context = canvas.getContext('2d');
//             context.clearRect(0, 0, canvas.width, canvas.height);
//
//             if (detections) {
//                 const resizedDetections = faceapi.resizeResults(detections, displaySize);
//                 faceapi.draw.drawDetections(canvas, resizedDetections);
//                 faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//             }
//         }, 1000);
//     };
//
//     if (isLoading) return <div>Loading facial recognition...</div>;
//     if (error) return <div className="text-red-500">{error}</div>;
//
//     return (
//         <div className="relative">
//             <video
//                 ref={videoRef}
//                 width="720"
//                 height="560"
//                 autoPlay
//                 muted
//                 onPlay={handleVideoPlay}
//                 className="rounded-lg"
//             />
//             <canvas
//                 ref={canvasRef}
//                 className="absolute top-0 left-0"
//             />
//         </div>
//     );
// };
//
// export default FacialRecognition;
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';  // Import face-api.js library
import axios from 'axios';  // For making API requests
import { API_HOST } from '../config';  // Import API host config

const FacialRecognition = ({ onLoginSuccess }) => {
    const videoRef = useRef(null);  // Video reference to capture stream
    const canvasRef = useRef(null); // Canvas reference for drawing landmarks
    const [isLoading, setIsLoading] = useState(true);  // State for loading
    const [error, setError] = useState(null);  // Error state to capture any issues

    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);

                // Load facial recognition models from /models path
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
                ]);

                startVideo();  // Start video after models are successfully loaded
            } catch (err) {
                setError('Failed to load facial recognition models.');  // Display error if models don't load
                console.error('Error loading models:', err);  // Log error details
            } finally {
                setIsLoading(false);  // Turn off loading spinner
            }
        };

        loadModels();  // Trigger loading models
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });  // Request camera access
            if (videoRef.current) {
                videoRef.current.srcObject = stream;  // Attach stream to video element
            }
        } catch (err) {
            setError('Unable to access camera');  // Set error if camera access fails
            console.error(err);  // Log error details
        }
    };

    const handleVideoPlay = () => {
        const canvas = canvasRef.current;  // Reference to canvas for drawing
        const video = videoRef.current;  // Reference to video stream

        if (!canvas || !video) return;  // Ensure canvas and video exist

        const displaySize = { width: video.width, height: video.height };  // Match video dimensions
        faceapi.matchDimensions(canvas, displaySize);  // Adjust canvas size to video

        setInterval(async () => {
            const detections = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())  // Detect face in video
                .withFaceLandmarks()  // Get face landmarks
                .withFaceDescriptor();  // Get face descriptor

            if (detections) {
                const faceDescriptor = Array.from(detections.descriptor);  // Convert descriptor to array
                try {
                    const response = await axios.post(`${API_HOST}/api/facial-login`, { faceDescriptor });

                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);  // Save token to localStorage
                        localStorage.setItem('userId', response.data.userId);  // Save userId to localStorage
                        onLoginSuccess();  // Trigger login success
                    }
                } catch (err) {
                    console.error('Face authentication failed:', err);  // Log if authentication fails
                }
            }

            const context = canvas.getContext('2d');  // Get canvas drawing context
            context.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

            if (detections) {
                const resizedDetections = faceapi.resizeResults(detections, displaySize);  // Resize detections to match video
                faceapi.draw.drawDetections(canvas, resizedDetections);  // Draw face detections
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);  // Draw face landmarks
            }
        }, 1000);  // Run every 1000ms (1 second)
    };

    if (isLoading) return <div>Loading facial recognition...</div>;  // Show loading screen
    if (error) return <div className="text-red-500">{error}</div>;  // Show error message

    return (
        <div className="relative">
            <video
                ref={videoRef}  // Attach video reference
                width="720"
                height="560"
                autoPlay
                muted
                onPlay={handleVideoPlay}  // Handle video play event
                className="rounded-lg"
            />
            <canvas
                ref={canvasRef}  // Attach canvas reference
                className="absolute top-0 left-0"  // Overlay canvas on video
            />
        </div>
    );
};

export default FacialRecognition;
