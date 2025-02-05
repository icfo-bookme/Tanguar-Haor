"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ImageCarousel = ({ propertyImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoChanging, setIsAutoChanging] = useState(true);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % propertyImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
        );
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!isAutoChanging) return;

        const interval = setInterval(() => {
            nextImage();
        }, 2000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoChanging, currentIndex, propertyImages.length]);

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Main Image Display */}
            <div className="relative w-full h-96 flex items-center justify-center">
                {/* Button Wrapper */}
                <div className="absolute inset-0 flex justify-between items-center px-4 z-50">
                    {/* Previous Button */}
                    <button
                        onClick={prevImage}
                        className="bg-black bg-opacity-50 text-white p-4 rounded-full shadow-lg 
                                   hover:bg-opacity-80 transition duration-300"
                    >
                        ◀
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextImage}
                        className="bg-black bg-opacity-50 text-white p-4 rounded-full shadow-lg 
                                   hover:bg-opacity-80 transition duration-300"
                    >
                        ▶
                    </button>
                </div>

                <div className="relative w-full h-full">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${propertyImages[currentIndex]?.path}`}
                        alt={`Property Image ${currentIndex + 1}`}
                        layout="fill"
                        className="object-cover rounded-lg shadow"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4">
                {propertyImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                            index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>

            {/* Thumbnail Preview */}
            <div className="flex gap-2 mt-4 overflow-x-auto justify-center">
                {propertyImages.map((image, index) => (
                    <div
                        key={index}
                        className={`w-16 h-16 relative cursor-pointer border-2 rounded-lg transition-all ${
                            index === currentIndex ? "border-blue-500 scale-110" : "border-transparent"
                        }`}
                        onClick={() => goToImage(index)}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                            alt={`Thumbnail ${index + 1}`}
                            layout="fill"
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
