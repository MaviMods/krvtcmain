// src/components/ImageGallery.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageGallery.css'; // Import the CSS file

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://bookback.koyeb.app/latest-images');
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            <h2>Latest Images</h2>
            <div className="image-gallery">
                {/* Reverse the order of images */}
                {images.reverse().map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Discord image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
