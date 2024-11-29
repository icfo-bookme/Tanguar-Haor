"use client";
import { useState } from "react";
import Image from "next/image";

const ImageCarousel = ({ propertyImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAll, setShowAll] = useState(false); // Track if we are showing all images or not

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % propertyImages.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + propertyImages.length) % propertyImages.length
        );
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    // Determine the images to show
    const displayedImages = showAll
        ? propertyImages
        : propertyImages.slice(currentIndex, currentIndex + 4);

    const handleShowAllClick = () => {
        setShowAll(!showAll); // Toggle showAll state
    };  

    return (
        <div className="flex col-span-2">
            <div className="flex-1 relative">
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full p-2"
                >
                    &lt;
                </button>

                <div className="relative w-full h-96">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${propertyImages[currentIndex].path}`}
                        alt={`Property Image ${currentIndex + 1}`}
                        fill
                        className="object-cover rounded shadow"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-gray-800 bg-opacity-50 rounded-full p-2"
                >
                    &gt;
                </button>
            </div>

            {/* Thumbnail Section */}
            <div className="flex flex-col justify-center ml-4">
                {displayedImages.map((image, index) => (
                    <div
                        key={index}
                        className={`relative cursor-pointer mb-2 p-1 border-2 ${currentIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => goToImage(index)}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="object-cover rounded"
                        />
                        {/* Show "+X more" inside the last image thumbnail */}
                        {!showAll && propertyImages.length > 4 && index === 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center text-sm font-bold">
                                {`+${propertyImages.length - 4} more`}
                            </div>
                        )}
                    </div>
                ))}

                {/* Show the "last image + count" if more than 4 images */}
                {!showAll && propertyImages.length > 4 && (
                    <div
                        className="cursor-pointer text-blue-500 mt-2"
                        onClick={handleShowAllClick}
                    >
                       
                    </div>
                )}

                {/* Reverse the order of images if 'showAll' is true */}
                {showAll && propertyImages.length > 4 && (
                    <div
                        className="cursor-pointer text-blue-500 mt-2"
                        onClick={handleShowAllClick}
                    >
                        Reverse Order
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
