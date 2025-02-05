"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ImageCarousel = ({ propertyImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
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

    const handleShowAllClick = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        if (!isAutoChanging) return;

        const interval = setInterval(() => {
            nextImage();
        }, 5000); // Change image every 10 seconds

        return () => clearInterval(interval);
    }, [isAutoChanging, currentIndex, propertyImages.length]);

    const displayedImages = showAll ? propertyImages : propertyImages.slice(0, 5);

    return (
        <div className="flex sm:flex-col col-span-2">
            {/* Main Image Display */}
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

            {/* Preview Thumbnails */}
            <div className="flex flex-col justify-start mt-2 pl-4 h-96">
                {displayedImages.map((image, index) => {
                    const realIndex = showAll ? index : index; // Ensure proper indexing
                    return (
                        <div
                            key={realIndex}
                            className={`relative cursor-pointer border-2 pb-3 ${
                                currentIndex === realIndex ? "border-blue-500" : "border-gray-300"
                            }`}
                            onClick={() => goToImage(realIndex)}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                alt={`Thumbnail ${realIndex + 1}`}
                                width={80}
                                height={80}
                                className="object-cover"
                                loading="lazy"
                                quality={75}
                            />

                            {!showAll && propertyImages.length > 5 && index === 4 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center text-sm font-bold">
                                    {`+${propertyImages.length - 5} more`}
                                </div>
                            )}
                        </div>
                    );
                })}

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
                        Hide extra
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
