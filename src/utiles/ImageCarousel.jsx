"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper"; // ✅ Added Autoplay module
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

const ImageCarousel = ({ propertyImages }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiperHeight, setSwiperHeight] = useState(450);
    const swiperRef = useRef(null); // ✅ Store Swiper instance

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setSwiperHeight(200);
            } else {
                setSwiperHeight(450);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Start autoplay after 10 seconds using Swiper API
    useEffect(() => {
        const timer = setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.autoplay.start();
            }
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!propertyImages || propertyImages.length === 0) {
        return <p className="text-center text-gray-500">No images available</p>;
    }

    return (
        <div className="relative w-full max-w-[71rem] mx-auto  bg-[#EBF0F4]">
            {/* Main Image Swiper */}
            <div className="relative w-full h-full">
                <Swiper
                    loop={true}
                    spaceBetween={2}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]} // ✅ Added Autoplay
                    className="mySwiper2"
                    style={{ height: `${swiperHeight}px` }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }} // ✅ Autoplay enabled
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper; // ✅ Store Swiper instance
                        swiper.autoplay.stop(); // ✅ Initially stop autoplay
                    }}
                >
                    {propertyImages.map((image, index) => (
                        <SwiperSlide key={index} className="w-[100%] h-[100%]">
                            <div className="relative rounded-xl w-full h-full">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                        alt={`Property Image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 768px) 100vw,"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <div className="mt-4">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    style={{ height: "110px" }}
                >
                    {propertyImages.map((image, index) => (
                        <SwiperSlide key={index} className="w-[30%] h-[100%]">
                            <div className="relative w-full h-full cursor-pointer border-2 rounded-xl transition-all">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover rounded-xl w-full h-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ImageCarousel;
