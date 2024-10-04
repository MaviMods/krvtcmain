// src/components/ImageGallery.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://bookback.koyeb.app/latest-images');
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error); // Logging the error to the console
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            <div className="image-gallery">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Discord image ${index + 1}`}
                        style={{ width: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
