"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ImageCarousel = ({ propertyImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [isAutoChanging, setIsAutoChanging] = useState(false);

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

    const getPreviewImages = () => {
        const previewImages = [...propertyImages];

        if (currentIndex > 0) {
            const firstImages = previewImages.splice(0, currentIndex);
            previewImages.push(...firstImages);
        }

        return previewImages.slice(0, 5); // Show 5 preview images
    };

    const handleShowAllClick = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        if (!isAutoChanging) return;

        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoChanging, currentIndex, propertyImages.length]);

    const toggleAutoChange = () => {
        setIsAutoChanging(!isAutoChanging);
    };

    const displayedImages = showAll
        ? propertyImages
        : getPreviewImages();

    return (
        <div className="flex sm:flex-col col-span-2">
            <div className="flex-1 relative flex justify-between items-center">
                <div className="relative w-full h-96">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${propertyImages[currentIndex]?.path}`}
                        alt={`Property Image ${currentIndex + 1}`}
                        layout="fill"
                        className="object-cover rounded shadow"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {!isAutoChanging && (
                <div className="flex  flex-col justify-start mt-2 pl-4 h-96">
                    {displayedImages.map((image, index) => (
                        <div
                            key={index}
                            className={`relative cursor-pointer mb-2 -mt-1 border-2 ${
                                currentIndex === index ? "border-blue-500" : "border-gray-300"
                            }`}
                            onClick={() => goToImage((currentIndex + index) % propertyImages.length)}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                alt={`Thumbnail ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover "
                            />
                            {!showAll && propertyImages.length > 5 && index === 4 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center text-sm font-bold">
                                    {`+${propertyImages.length - 5} more`}
                                </div>
                            )}
                        </div>
                    ))}

                    {!showAll && propertyImages.length > 5 && (
                        <div
                            className="cursor-pointer text-blue-500 mt-2"
                            onClick={handleShowAllClick}
                        >
                            Show all
                        </div>
                    )}

                    {showAll && propertyImages.length > 5 && (
                        <div
                            className="cursor-pointer text-blue-500 mt-2"
                            onClick={handleShowAllClick}
                        >
                            Reverse Order
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
