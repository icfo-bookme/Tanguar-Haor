"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ImageCarousel = ({ propertyImages }) => {
    const [currentIndex, setCurrentIndex] = useState(2); // Start with the third image

    useEffect(() => {
        if (propertyImages.length > 1) {
            setCurrentIndex(2); // Ensure the third image is active on first load
        }
    }, [propertyImages]);

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex); // Use realIndex for infinite loop slides
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto mt-7">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={5} // Show 5 slides at a time
                spaceBetween={10} // Add margin between slides
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true} // Enable infinite looping
                coverflowEffect={{
                    rotate: 20, // No rotation
                    stretch: 0, // No stretching
                    depth: 30, // No depth effect
                    modifier: 1, // Adjust the modifier for spacing
                    slideShadows: false, // Disable shadows
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                onSlideChange={handleSlideChange}
                initialSlide={2} // Start with the third image
                className="swiper mySwiper"
                breakpoints={{
                    320: { slidesPerView: 2 }, // Mobile view
                    768: { slidesPerView: 5 }, // Desktop view
                }}
            >
                {propertyImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`relative w-full h-96 transition-all ${index === currentIndex ? "scale-105" : "opacity-80"}`}
                            style={{ marginLeft: "10px" }}
                        >
                            <div className="relative w-full h-full bg-black rounded-xl">
                                {/* Image without opacity, so the overlay is visible */}
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                    alt={`Property Image ${index + 1}`}
                                    layout="fill"
                                    className="object-cover rounded-xl"
                                    sizes="(max-width: 768px) 100vw, 300vw"
                                />

                                {/* Overlay background */}
                                <div className="absolute inset-0 bg-gray-800 rounded-xl" style={{ opacity: 0.2 }}></div>

                                {/* Caption at the bottom left using inline CSS */}
                                <div
                                    className="absolute"
                                    style={{
                                        bottom: "10px",
                                        left: "10px",
                                        padding: "10px",
                                        color: "white",
                                        fontSize: "1.25rem",
                                        fontWeight: "bold",
                                        zIndex: 10,
                                    }}
                                >
                                    {image.caption || `Image ${index + 1}`}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>



                ))}
            </Swiper>

            {/* Thumbnail Preview */}
            <div className="flex gap-2 mt-4 overflow-x-auto justify-center">
                {propertyImages.map((image, index) => (
                    <div
                        key={index}
                        className={`w-16 h-16 relative cursor-pointer border-2 rounded-xl transition-all transform ${index === currentIndex ? "border-blue-500 scale-110" : "border-transparent"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            transform: index === currentIndex ? "rotate(0deg)" : "rotate(5deg)", // Add a tilt effect to thumbnails
                        }}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                            alt={`Thumbnail ${index + 1}`}
                            layout="fill"
                            className="object-cover rounded-xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
