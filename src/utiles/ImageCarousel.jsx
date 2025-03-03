"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const ImageCarousel = ({ propertyImages }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiperHeight, setSwiperHeight] = useState(450);
    const [swiperBottomHeight, setBottomSwiperHeight] = useState(400);
    const [thumbsDirection, setThumbsDirection] = useState("vertical");

    const swiperRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setSwiperHeight(200);
            } else if (window.innerHeight < 1000) {
                setSwiperHeight(400);
            } else {
                setSwiperHeight(450);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setBottomSwiperHeight(60);
            } else if (window.innerWidth < 768) {
                setBottomSwiperHeight(80);
            } else if (window.innerWidth < 1024) {
                setBottomSwiperHeight(150);
            } else {
                setBottomSwiperHeight(400);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.autoplay.start();
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1016) {
                setThumbsDirection("horizontal");
            } else {
                setThumbsDirection("vertical");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!propertyImages || propertyImages.length === 0) {
        return <p className="text-center text-gray-500">No images available</p>;
    }

    return (
        <>
            <div className="flex lg:flex-row flex-col items-start gap-4 mx-auto bg-[#EBF0F4]" style={{ maxWidth: "100%" }}>
                <div className="relative w-full">
                    <Swiper
                        loop={true}
                        spaceBetween={2}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
                        className="mySwiper2 swiper-instance-two"
                        pagination={{ clickable: true }}
                        style={{ height: `${swiperHeight}px`, maxWidth: "1000px" }}
                        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            swiper.autoplay.stop();
                        }}
                    >
                        {propertyImages.map((image, index) => (
                            <SwiperSlide key={index} className="w-[100%] h-[100%]">
                                <div className="relative rounded-xl w-full h-full">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                                        alt={`Property Image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-xl w-full h-full"
                                        sizes="(max-width: 768px) 100vw,"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex-shrink-0 max-w-[40%] min-w-[200px]" style={{ minWidth: "200px" }}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        direction={thumbsDirection}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiperShort fix-height-swiper"
                        style={{
                            height: `${swiperBottomHeight}px`,
                            maxWidth: "400px",
                            transform: thumbsDirection === "horizontal" ? "scaleX(-1)" : "scaleY(-1)",
                        }}
                    >
                        {[...propertyImages].reverse().map((image, index) => (
                            <SwiperSlide
                                key={index}
                                className="w-full h-[80px]"
                                style={{
                                    transform: thumbsDirection === "horizontal" ? "scaleX(-1)" : "scaleY(-1)",
                                }}
                            >
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
        </>
    );
};

export default ImageCarousel;